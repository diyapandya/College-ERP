const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
const Student = require("../models/student.model")
const Certificate = require("../models/certificate.model")
const Timetable = require("../models/timetable.model")
const Assignment = require("../models/assignment.model")
const Result = require("../models/result.model")
const Academic = require("../models/academic.model")
const MonthlySummary = require("../models/monthlySummary.model")
const Notification = require("../models/notification.model")
const User = require("../models/user.model")
// Get Attendance Records for a Student
exports.getMyAttendance = async (req, res) => {
  try {
    // studentId comes from auth.middleware
    const attendance = await Attendance.find({
      studentId: req.user.linkedStudentId
    })

    res.json(attendance)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
// Get Academic Status for a Student
exports.getMyAttendanceStatus = async (req, res) => {
  const data = await Academic.find({
    studentId: req.user.linkedStudentId
  })

  res.json(data)
}
exports.getMyMarks = async(req,res)=>{
  const data = await Marks.find({studentId:req.user.linkedStudentId})
  res.json(data)
}

exports.saveProfile = async (req, res) => {
  try {
    const studentId = req.user.studentId

    // 🔁 CREATE OR UPDATE PROFILE (SINGLE SOURCE OF TRUTH)
    const student = await Student.findOneAndUpdate(
      { studentId },                 // match by studentId
      { 
        ...req.body,
        studentId                   // always enforce from token
      },
      { 
        upsert: true,               // create if not exists
        new: true                   // return updated document
      }
    )

    // 🔗 Link student profile to auth user (idempotent)
    await User.findByIdAndUpdate(
      req.user.id,
      { linkedStudentId: studentId },
      { new: true }
    )

    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.user.linkedStudentId
    })

    if (!student) {
      return res.status(404).json("Student profile not found")
    }

    res.json(student)
  } catch (err) {
    res.status(500).json(err.message)
  }
}


exports.addCertificate = async(req,res)=>{
  const cert = await Certificate.create({...req.body, studentId: req.user.linkedStudentId})
  res.json(cert)
}

exports.getCertificates = async(req,res)=>{
  res.json(await Certificate.find({studentId:req.user.linkedStudentId}))
}
exports.getMyTimetable = async (req, res) => {
  console.log("STUDENT USER:", req.user)  

  const timetable = await Timetable.find({
    branch: req.user.branch,
    semester: req.user.semester,
    division: req.user.division
  })

  res.json(timetable)
}
// Student assignments
exports.getMyAssignments = async (req, res) => {
  try {
    // req.user.branch / semester / division
    // come from auth.middleware

    const assignments = await Assignment.find({
      branch: req.user.branch,
      semester: req.user.semester,
      division: req.user.division
    }).sort({ createdAt: -1 })

    res.json(assignments)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
// Student results
exports.getMyResults = async (req, res) => {
  const results = await Academic.find({
    studentId: req.user.linkedStudentId
  })
  res.json(results)
}

// ================= EXAM ELIGIBILITY =================
exports.getMyEligibility = async (req, res) => {
  try {
    const data = await Academic.find(
      { studentId: req.user.linkedStudentId },
      "subject eligibilityStatus"
    )

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}


exports.getMyRiskStatus = async (req, res) => {
  const data = await Academic.find({
    studentId: req.user.linkedStudentId,
    riskFlag: true
  })

  res.json(data)
}
exports.getMyMonthlySummary = async (req, res) => {
  const data = await MonthlySummary.find({
    studentId: req.user.linkedStudentId
  }).sort({ month: -1 })

  res.json(data)
}
exports.getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({
    studentId: req.user.linkedStudentId
  }).sort({ createdAt: -1 })

  res.json(notifications)
}