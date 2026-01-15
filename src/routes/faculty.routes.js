const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const { submitAttendance, getAtRiskStudents,submitMarks } = require("../controllers/faculty.controller")

router.post("/attendance", auth, submitAttendance)
router.get("/at-risk", auth, getAtRiskStudents)
router.post("/marks", auth, submitMarks)
module.exports = router
