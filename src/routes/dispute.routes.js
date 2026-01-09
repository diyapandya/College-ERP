const router = require("express").Router()
const {raiseDispute,getDisputesByStudent,resolveDispute} = require("../controllers/dispute.controller")

router.post("/raise",raiseDispute)
router.get("/student/:studentId",getDisputesByStudent)
router.put("/resolve/:disputeId",resolveDispute)
module.exports = router
