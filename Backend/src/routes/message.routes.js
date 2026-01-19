const router = require("express").Router()
const {sendMessage,getConversation} = require("../controllers/message.controller")

router.post("/send",sendMessage)
router.get("/conversation/:userId",getConversation)
module.exports = router
