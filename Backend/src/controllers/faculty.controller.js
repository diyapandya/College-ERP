const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
const Timetable = require("../models/timetable.model")
const Assignment = require("../models/assignment.model")
const Result = require("../models/result.model")
const Academic = require("../models/academic.model")
const MonthlySummary = require("../models/monthlySummary.model")
const Student = require("../models/student.model")
const Certificate = require("../models/certificate.model")
const Mentor = require("../models/mentor.model") 
const { syncMentorDashboard } = require("../services/mentor.service")

const {
  sendMarksNotification,
  sendAttendanceRiskAlert
} = require("../services/notification.service")

// ================= ATTENDANCE =================
exports.submitAttendance = async (req, res) => {
  try {

    const {
      subject,
      date,
      slot,
      branch,
      semester,
      division,
      batch,
      presentStudents
    } = req.body;

    const facultyId = req.user.id;


    /* =====================================================
       ✅ VALIDATE FACULTY SLOT
    ===================================================== */

    const validSlot = await Timetable.findOne({
      facultyId,
      subject,
      day: new Date(date).toLocaleString("en-US", { weekday: "long" }),
      startTime: slot.start
    });

    if (!validSlot) {
      return res.status(403).json("Not your lecture");
    }


    /* =====================================================
       ✅ PREVENT DUPLICATE
    ===================================================== */

    const exists = await Attendance.findOne({
      subject,
      date,
      "slot.start": slot.start,
      branch,
      semester,
      division
    });

    if (exists) {
      return res
        .status(400)
        .json("Attendance already marked for this lecture");
    }


    /* =====================================================
       ✅ FETCH STUDENTS
    ===================================================== */

    const students = await Student.find({
      branch,
      semester,
      division,
      ...(batch && { batch })
    });


    if (!students.length) {
      return res.status(404).json("No students found");
    }


    /* =====================================================
       ✅ PREPARE RECORDS
    ===================================================== */

    const records = students.map(s => ({

      studentId: s.studentId,

      subject,
      date,
      slot,

      facultyId,

      branch,
      semester,
      division,
      batch,

      status: presentStudents.includes(s.studentId)
        ? "present"
        : "absent"
    }));


    /* =====================================================
       ✅ SAVE ATTENDANCE
    ===================================================== */

    await Attendance.insertMany(records);


    /* =====================================================
       ✅ UPDATE ACADEMIC SUMMARY
    ===================================================== */

    const studentIds = students.map(s => s.studentId);

    const total = await Attendance.countDocuments({
      studentId: { $in: studentIds },
      subject
    });

    const present = await Attendance.countDocuments({
      studentId: { $in: studentIds },
      subject,
      status: "present"
    });

    const percent = total
      ? Math.round((present / total) * 100)
      : 0;


    await Academic.updateMany(
      {
        subject,
        studentId: { $in: studentIds }
      },
      {
        attendancePercent: percent,
        riskFlag: percent < 75
      }
    );


    /* =====================================================
       ✅ SYNC MENTOR
    ===================================================== */

    await syncMentorDashboard(semester + division);


    /* =====================================================
       ✅ RESPONSE
    ===================================================== */

    res.json({
      message: "Attendance saved successfully",
      percentage: percent
    });


  } catch (err) {

    console.error("Attendance Error:", err);

    res.status(500).json({
      error: err.message
    });

  }
};




// ================= AT RISK STUDENTS =================
exports.getAtRiskStudents = async (req, res) => {
  try {

    const list = await Academic.find({
      $or: [
        { riskFlag: true },
        { attendancePercent: { $lt: 75 } },
        { internalMarks: { $lt: 40 } },
        { eligibilityStatus: "Not Eligible" }
      ]
    }).select(
      "studentId subject attendancePercent internalMarks eligibilityStatus"
    )

    res.json(list)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



// ================= MARKS =================
exports.submitMarks = async (req, res) => {
  try {

    const {
      studentId,
      subject,
      internal1,
      internal2,
      assignment
    } = req.body

    const facultyId = req.user.id


    /* =====================================================
       ✅ CHECK STUDENT EXISTS
       ===================================================== */
    const student = await Student.findOne({ studentId })

    if (!student) {
      return res.status(404).json("Student not found")
    }


    /* =====================================================
       ✅ CHECK FACULTY TEACHES THIS STUDENT
       ===================================================== */
    const teaches = await Timetable.findOne({
      facultyId,
      subject,
      division: student.division,
      semester: student.semester
    })

    if (!teaches) {
      return res.status(403).json("Not your subject")
    }


    /* ---------------- TOTAL ---------------- */
    const total = internal1 + internal2 + assignment
    const percentage = Math.round((total / 100) * 100)


    /* ---------------- GRADE LOGIC ---------------- */
    let grade

    if (percentage >= 90) grade = "A+"
    else if (percentage >= 80) grade = "A"
    else if (percentage >= 70) grade = "B+"
    else if (percentage >= 60) grade = "B"
    else if (percentage >= 50) grade = "C"
    else if (percentage >= 40) grade = "D"
    else grade = "F"


    /* ---------------- ELIGIBILITY & RISK ---------------- */
    const eligibility = percentage >= 40 ? "Eligible" : "Not Eligible"
    const risk = percentage < 40


    /* ---------------- ACADEMIC HEALTH ---------------- */
    const health =
      percentage >= 80 ? 90 :
      percentage >= 60 ? 70 :
      percentage >= 40 ? 50 : 25


    /* ---------------- SAVE MARKS ---------------- */
    const marksData = [
      {
        studentId,
        subject,
        examType: "Internal-1",
        marks: internal1,
        remarks: internal1 >= 12 ? "Pass" : "Fail",
        facultyId
      },
      {
        studentId,
        subject,
        examType: "Internal-2",
        marks: internal2,
        remarks: "Recorded",
        facultyId
      },
      {
        studentId,
        subject,
        examType: "Assignment",
        marks: assignment,
        remarks: "Recorded",
        facultyId
      }
    ]


    for (const mark of marksData) {

      await Marks.findOneAndUpdate(
        { studentId, subject, examType: mark.examType },
        mark,
        { upsert: true, new: true }
      )
    }


    /* ---------------- SAVE TO ACADEMIC ENGINE ---------------- */
    await Academic.findOneAndUpdate(
      { studentId, subject },
      {
        internalMarks: internal1 + internal2,
        academicHealth: health,
        eligibilityStatus: eligibility,
        riskFlag: risk,
        grade
      },
      { upsert: true, new: true }
    )


    /* ---------------- NOTIFICATION ---------------- */
    await sendMarksNotification({
      studentId,
      subject,
      total,
      grade,
      eligibility
    })


    res.json({
      message: "Marks Updated Successfully",
      total,
      percentage,
      grade,
      eligibility,
      risk
    })


  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



// ================= TIMETABLE =================
exports.addTimetable = async (req, res) => {
  try {

    const normalize = (item) => ({
      subject: item.subject,
      day: item.day,
      startTime: item.startTime,
      endTime: item.endTime,
      room: item.room,

      // 🔒 FORCE THESE
      branch: item.branch,
      semester: Number(item.semester),
      division: item.division,

      facultyId: req.user.id
    })


    const data = Array.isArray(req.body)
      ? req.body.map(normalize)
      : [normalize(req.body)]


    const timetable = await Timetable.insertMany(data)


    res.status(201).json({
      message: "Timetable added successfully",
      timetable
    })


  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



// ================= GET MY TIMETABLE =================
exports.getFacultyTimetable = async (req, res) => {

  const timetable = await Timetable.find({
    facultyId: req.user.id
  })

  res.json(timetable)
}



// ================= ASSIGNMENT =================
exports.addAssignment = async (req, res) => {
  try {

    const {
      title,
      subject,
      description,
      dueDate,
      subjectSlotId
    
    } = req.body


   // Get class info from timetable
const slot = await Timetable.findById(subjectSlotId);

if (!slot) {
  return res.status(400).json("Invalid class slot");
}

const assignment = await Assignment.create({
  title,
  subject,
  description,
  dueDate,

  branch: slot.branch,
  semester: slot.semester,
  division: slot.division,

  facultyId: req.user.id
});


    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    })


  } catch (err) {
    res.status(500).json(err.message)
  }
}
// ================= GET MY ASSIGNMENTS =================
exports.getMyAssignments = async (req, res) => {
  try {
    const list = await Assignment.find({
      facultyId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ================= DELETE ASSIGNMENT =================
exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findOneAndDelete({
      _id: req.params.id,
      facultyId: req.user.id
    });

    res.json("Assignment deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};



// ================= RESULT =================
exports.addResult = async (req, res) => {

  const result = await Result.create({
    ...req.body,
    semester: Number(req.body.semester),
    facultyId: req.user.id
  })

  res.status(201).json(result)
}



// ================= MONTHLY SUMMARY =================
exports.getMonthlySummaries = async (req, res) => {

  const list = await MonthlySummary.find().sort({ month: -1 })

  res.json(list)
}



// ================= STUDENTS BY DIVISION =================
exports.getStudentsByDivision = async (req, res) => {

  const { branch, semester, division } = req.query

  const students = await Student.find({
    branch,
    semester,
    division
  })

  res.json(students)
}



// ================= STUDENT VAULT =================
exports.getStudentVault = async (req, res) => {

  const { studentId } = req.params

  const profile = await Student.findOne({ studentId })
  const academics = await Academic.find({ studentId })
  const certificates = await Certificate.find({ studentId })
  const summaries = await MonthlySummary.find({ studentId })

  res.json({
    profile,
    academics,
    certificates,
    summaries
  })
}



// =====================================================
// ✅ SUBSTITUTE FACULTY SYSTEM
// =====================================================
exports.assignSubstitute = async (req, res) => {

  const { timetableId, newFacultyId, remarks } = req.body

  await Timetable.findByIdAndUpdate(timetableId, {
    substituteFaculty: newFacultyId,
    remarks,
    isSubstituted: true
  })

  res.json("Substitute Assigned Successfully")
}



// =====================================================
// ✅ FACULTY DASHBOARD APIs
// =====================================================

// ----------- MY CLASSES -----------
exports.getMyClasses = async (req, res) => {

  const list = await Timetable.find({
    facultyId: req.user.id
  })

  res.json(list)
}


// ----------- MY STUDENTS -----------
exports.getMyStudents = async (req, res) => {

  const data = await Student.find({
    branch: req.query.branch,
    semester: req.query.semester,
    division: req.query.division
  })

  res.json(data)
}


// ----------- MY MENTEES (MENTOR STUDENTS) -----------
exports.getMyMentees = async (req, res) => {

  const mentor = await Mentor.findOne({
    mentors: req.user.id
  })

  if (!mentor) return res.json([])

  const students = await Student.find({
    division: mentor.division
  })

  res.json(students)
}
