const router = require("express").Router()
const { evaluateEligibility, calculateHealthScore } = require("../controllers/system.controller")
router.get("/evaluate/eligibility/:studentId", evaluateEligibility)
router.get("/evaluate/health/:studentId", calculateHealthScore)

module.exports = router
