const router = require("express").Router()
const { getAttendance,getMarks,saveProfile,getStudentProfile,addCertificate,getCertificates} = require("../controllers/student.controller")
const auth = require("../middleware/auth.middleware")
router.get("/:studentId/attendance", auth, getAttendance)
router.get("/:studentId/marks", auth, getMarks)
router.post("/profile", auth, saveProfile)
router.get("/:studentId/profile", auth, getStudentProfile)
router.post("/certificate", auth, addCertificate)
router.get("/:studentId/certificates", auth, getCertificates)

module.exports = router
