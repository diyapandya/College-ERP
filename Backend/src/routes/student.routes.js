const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  // Faculty
  getStudentsByClass,

  // Profile
  saveProfile,
  getStudentProfile,

  // Attendance
  getMyAttendance,
  getMyAttendanceSummary,
  getMyRiskStatus,

  // Marks & Academics
  getMyMarks,
  getMyResults,
  getMyEligibility,
  getMyMonthlySummary,

  // Dashboard
  getMyDashboard,

  // Timetable & Subjects
  getMyTimetable,
  getMySubjects,

  // Assignments
  getMyAssignments,

  // Certificates
  addCertificate,
  getCertificates,

} = require("../controllers/student.controller");


/* =========================================================
   ================= FACULTY ROUTES =========================
   ========================================================= */

// Get students by semester & division
router.get("/", auth, role("faculty"), getStudentsByClass);


/* =========================================================
   ================= STUDENT PROFILE ========================
   ========================================================= */

router.post("/profile", auth, role("student"), saveProfile);
router.get("/profile", auth, role("student"), getStudentProfile);


/* =========================================================
   ================= STUDENT ATTENDANCE =====================
   ========================================================= */

router.get("/attendance", auth, role("student"), getMyAttendance);
router.get("/attendance-summary", auth, role("student"), getMyAttendanceSummary);
router.get("/risk-status", auth, role("student"), getMyRiskStatus);


/* =========================================================
   ================= MARKS & RESULTS ========================
   ========================================================= */

router.get("/marks", auth, role("student"), getMyMarks);
router.get("/results", auth, role("student"), getMyResults);
router.get("/eligibility", auth, role("student"), getMyEligibility);
router.get("/monthly-summary", auth, role("student"), getMyMonthlySummary);


/* =========================================================
   ================= TIMETABLE & ASSIGNMENTS ================
   ========================================================= */

router.get("/timetable", auth, role("student"), getMyTimetable);
router.get("/subjects", auth, role("student"), getMySubjects);
router.get("/assignments", auth, role("student"), getMyAssignments);


/* =========================================================
   ================= CERTIFICATES ===========================
   ========================================================= */

router.post("/certificate", auth, role("student"), addCertificate);
router.get("/certificates", auth, role("student"), getCertificates);


/* =========================================================
   ================= DASHBOARD ==============================
   ========================================================= */

router.get("/dashboard", auth, role("student"), getMyDashboard);


module.exports = router;
