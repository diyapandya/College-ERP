const router = require("express").Router()
const {getMonthlySummary} = require("../controllers/parent.controller")
router.get("/summary/:studentId",getMonthlySummary)
module.exports = router
