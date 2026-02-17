const Attendance = require("../models/attendance.model");
const Marks = require("../models/marks.model");
const Student = require("../models/student.model");
const Certificate = require("../models/certificate.model");
const Timetable = require("../models/timetable.model");
const Assignment = require("../models/assignment.model");
const Academic = require("../models/academic.model");
const MonthlySummary = require("../models/monthlySummary.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");

/* =========================================================
   ================= FACULTY SECTION ========================
   ========================================================= */

/* Get Students by Semester + Division */
exports.getStudentsByClass = async (req, res) => {
  try {
    const { semester, division,batch } = req.query;
  let filter = {
      semester: Number(semester),
      division,
    };

    if (batch) {
      filter.batch = batch;
    }
    const students = await Student.find(filter).sort({ name: 1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= STUDENT PROFILE ========================
   ========================================================= */

exports.saveProfile = async (req, res) => {
  try {
    const studentId = req.user.linkedStudentId;

    const student = await Student.findOneAndUpdate(
      { studentId },
      { ...req.body, studentId },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(
      req.user.id,
      { linkedStudentId: studentId },
      { new: true }
    );

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.user.linkedStudentId,
    });

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= STUDENT ATTENDANCE =====================
   ========================================================= */

exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      studentId: req.user.linkedStudentId,
    }).sort({ date: -1 });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.linkedStudentId;

    const data = await Attendance.find({ studentId });

    const total = data.length;
    const present = data.filter(a => a.status === "Present").length;
    const percent = total ? Math.round((present / total) * 100) : 0;

    res.json({ total, present, percent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= MARKS & RESULTS ========================
   ========================================================= */

exports.getMyMarks = async (req, res) => {
  try {
    const data = await Marks.find({
      studentId: req.user.linkedStudentId,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const results = await Academic.find({
      studentId: req.user.linkedStudentId,
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyEligibility = async (req, res) => {
  try {
    const data = await Academic.find(
      { studentId: req.user.linkedStudentId },
      "subject eligibilityStatus"
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyRiskStatus = async (req, res) => {
  try {
    const data = await Academic.find({
      studentId: req.user.linkedStudentId,
      riskFlag: true,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= CERTIFICATES ===========================
   ========================================================= */

exports.addCertificate = async (req, res) => {
  try {
    const cert = await Certificate.create({
      ...req.body,
      studentId: req.user.linkedStudentId,
    });

    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      studentId: req.user.linkedStudentId,
    });

    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= TIMETABLE & SUBJECTS ===================
   ========================================================= */

exports.getMyTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({
      branch: req.user.branch,
      semester: req.user.semester,
      division: req.user.division,
    }).sort({ day: 1, startTime: 1 });

    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMySubjects = async (req, res) => {
  try {
    const list = await Timetable.find({
      branch: req.user.branch,
      semester: req.user.semester,
      division: req.user.division,
    }).select("subject facultyId");

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= ASSIGNMENTS ============================
   ========================================================= */

exports.getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      branch: req.user.branch,
      semester: req.user.semester,
      division: req.user.division,
    }).sort({ createdAt: -1 });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= MONTHLY SUMMARY ========================
   ========================================================= */

exports.getMyMonthlySummary = async (req, res) => {
  try {
    const data = await MonthlySummary.find({
      studentId: req.user.linkedStudentId,
    }).sort({ month: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= NOTIFICATIONS ==========================
   ========================================================= */

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      studentId: req.user.linkedStudentId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================================================
   ================= STUDENT DASHBOARD ======================
   ========================================================= */

exports.getMyDashboard = async (req, res) => {
  try {
    const studentId = req.user.linkedStudentId;

    const attendance = await Attendance.find({ studentId });
    const marks = await Marks.find({ studentId });
    const academics = await Academic.find({ studentId });

    const totalAttendance = attendance.length;
    const presentAttendance = attendance.filter(a => a.status === "Present").length;

    const avgAttendance = totalAttendance
      ? Math.round((presentAttendance / totalAttendance) * 100)
      : 0;

    const avgMarks = marks.length
      ? Math.round(
          marks.reduce((sum, m) => sum + (m.marks || 0), 0) / marks.length
        )
      : 0;

    res.json({
      attendance,
      marks,
      academics,
      avgAttendance,
      avgMarks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
