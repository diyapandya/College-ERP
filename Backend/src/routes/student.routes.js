const router = require("express").Router()

const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

const {
  getMyAttendance,
  getMyAttendanceStatus,
  getMyRiskStatus,
  getMyMarks,
  saveProfile,
  getStudentProfile,
  addCertificate,
  getCertificates,
  getMyTimetable,
  getMyAssignments,
  getMyResults,
  getMyMonthlySummary,
  getMyEligibility,
  getMyDashboard,
  getMySubjects,
  getMyAttendanceSummary
} = require("../controllers/student.controller")



/* ================= PROFILE ================= */
router.post("/profile", auth, role("student"), saveProfile)
router.get("/profile", auth, role("student"), getStudentProfile)

/* ================= ATTENDANCE & MARKS ================= */
router.get("/attendance", auth, role("student"), getMyAttendance)
router.get("/marks", auth, role("student"), getMyMarks)
router.get("/attendance-status", auth, role("student"), getMyAttendanceStatus)  
router.get("/risk-status", auth, role("student"), getMyRiskStatus)  
/* ================= CERTIFICATES ================= */
router.post("/certificate", auth, role("student"), addCertificate)
router.get("/certificates", auth, role("student"), getCertificates)

/* ================= ACADEMICS (FACULTY GENERATED) ================= */
router.get("/timetable", auth, role("student"), getMyTimetable)
router.get("/assignments", auth, role("student"), getMyAssignments)
router.get("/results", auth, role("student"), getMyResults)
router.get("/eligibility", auth, role("student"), getMyEligibility)
router.get("/monthly-summary", auth, role("student"), getMyMonthlySummary)
router.get("/dashboard", auth, role("student"), getMyDashboard)
router.get("/subjects", auth, role("student"), getMySubjects)
router.get("/attendance-summary", auth, role("student"), getMyAttendanceSummary)
module.exports = router
