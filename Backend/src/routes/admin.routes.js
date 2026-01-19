const router = require("express").Router()
const { seedStudents, seedFaculty , resetUser} = require("../controllers/admin.controller")
router.post("/seed/students", seedStudents)
router.post("/seed-faculty", seedFaculty)
router.delete("/reset-user", resetUser);

module.exports = router
