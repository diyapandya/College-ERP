const router = require("express").Router()
const { seedStudents } = require("../controllers/admin.controller")
router.post("/seed/students", seedStudents)
module.exports = router
