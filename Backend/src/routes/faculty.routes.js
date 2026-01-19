const router = require("express").Router()

const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

const {
  submitAttendance,
  getAtRiskStudents,
  submitMarks,
  addTimetable,
  getFacultyTimetable,
  addAssignment,
  addResult,
  getMonthlySummaries,
  getStudentsByDivision,
  getStudentVault
} = require("../controllers/faculty.controller")

/* ================= FACULTY ROUTES ================= */
router.post("/assignment", auth, role("faculty"), addAssignment)
router.post("/attendance", auth, role("faculty"), submitAttendance)
router.get("/at-risk", auth, role("faculty"), getAtRiskStudents)
router.post("/marks", auth, role("faculty"), submitMarks)
router.post("/timetable", auth, role("faculty"), addTimetable)
router.get("/timetable", auth, role("faculty"), getFacultyTimetable)
router.post("/result", auth, role("faculty"), addResult)
router.get("/monthly-summaries", auth, role("faculty"), getMonthlySummaries)
router.get("/students", auth, role("faculty"), getStudentsByDivision)
router.get("/student-vault/:studentId", auth, role("faculty"), getStudentVault)

module.exports = router
