const router = require("express").Router()

const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

const {

  // Attendance
  submitAttendance,
  getAtRiskStudents,

  // Marks
  submitMarks,

  // Timetable
  addTimetable,
  getFacultyTimetable,
  assignSubstitute,      // ✅ NEW

  // Assignment / Result
  addAssignment,
  getMyAssignments,
deleteAssignment,
  addResult,

  // Dashboard
  getMonthlySummaries,
  getStudentsByDivision,
  getStudentVault,

  // Faculty Dashboard
  getMyClasses,          // ✅ NEW
  getMyStudents,         // ✅ NEW
  getMyMentees           // ✅ NEW

} = require("../controllers/faculty.controller")



/* ================= FACULTY ROUTES ================= */

// Assignment
router.post("/assignment", auth, role("faculty"), addAssignment)
router.get("/assignment", auth, role("faculty"), getMyAssignments);
router.delete("/assignment/:id", auth, role("faculty"), deleteAssignment);
// Attendance
router.post("/attendance", auth, role("faculty"), submitAttendance)

// Risk Students
router.get("/at-risk", auth, role("faculty"), getAtRiskStudents)

// Marks
router.post("/marks", auth, role("faculty"), submitMarks)

// Timetable
router.post("/timetable", auth, role("faculty"), addTimetable)
router.get("/timetable", auth, role("faculty"), getFacultyTimetable)

// Substitute Faculty
router.post("/substitute", auth, role("faculty"), assignSubstitute) // ✅ NEW

// Result
router.post("/result", auth, role("faculty"), addResult)

// Monthly Summary
router.get("/monthly-summaries", auth, role("faculty"), getMonthlySummaries)

// Students
router.get("/students", auth, role("faculty"), getStudentsByDivision)

// Student Vault
router.get("/student-vault/:studentId", auth, role("faculty"), getStudentVault)


// ================= FACULTY DASHBOARD =================

// My Classes
router.get("/my-classes", auth, role("faculty"), getMyClasses)

// My Students (Filtered)
router.get("/my-students", auth, role("faculty"), getMyStudents)

// My Mentees
router.get("/my-mentees", auth, role("faculty"), getMyMentees)



module.exports = router
