const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
const Timetable = require("../models/timetable.model")
const Assignment = require("../models/assignment.model")
const Result = require("../models/result.model")
const Academic = require("../models/academic.model")
const MonthlySummary = require("../models/monthlySummary.model")
const Student = require("../models/student.model")
const Certificate = require("../models/certificate.model")
const {
  sendMarksNotification,
  sendAttendanceRiskAlert
} = require("../services/notification.service")

// ================= ATTENDANCE =================
exports.submitAttendance = async (req, res) => {
  try {
    const { studentId, subject, totalLectures, attendedLectures } = req.body

    const percentage = Math.round((attendedLectures / totalLectures) * 100)
    const risk = percentage < 75

    // Save Attendance
    const record = await Attendance.findOneAndUpdate(
      { studentId, subject },
      { totalLectures, attendedLectures, percentage, risk },
      { upsert: true, new: true }
    )

    // Sync to Academic Engine
    await Academic.findOneAndUpdate(
      { studentId, subject },
      { attendancePercent: percentage, riskFlag: risk },
      { upsert: true }
    )
    /*  ATTENDANCE RISK ALERT */
    if (risk) {
      await sendAttendanceRiskAlert({
        studentId,
        subject,
        attendancePercent: percentage
      })
    }

    res.json({ message: "Attendance Updated", percentage, risk })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



// At Risk Students
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

    /* ---------------- TOTAL ---------------- */
    const total = internal1 + internal2 + assignment
    const percentage = Math.round((total / 100) * 100)

    /* ---------------- GRADE LOGIC (HERE ✅) ---------------- */
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

    /* ---------------- SAVE MARKS (PER EXAM TYPE) ---------------- */
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
        grade        // ✅ STORE GRADE HERE
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
      : [normalize(req.body)]   // 👈 ALWAYS ARRAY

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
      branch,
      semester,
      division
    } = req.body

    // Faculty creates assignment for TARGET students
    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      branch,
      semester : Number(semester),
      division,
      facultyId: req.user.id
    })

    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    })
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// ================= RESULT =================
exports.addResult = async (req, res) => {
  const result = await Result.create({
    ...req.body,
    semester: Number(req.body.semester),
    facultyId: req.user.id
  })

  res.status(201).json(result)
}

exports.getMonthlySummaries = async (req, res) => {
  const list = await MonthlySummary.find().sort({ month: -1 })
  res.json(list)
}
exports.getStudentsByDivision = async (req, res) => {
  const { branch, semester, division } = req.query

  const students = await Student.find({
    branch,
    semester,
    division
  })

  res.json(students)
}
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
