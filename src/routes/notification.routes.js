const router = require("express").Router()
const {createNotification,getNotifications} = require("../controllers/notification.controller")

router.post("/create",createNotification)
router.get("/:userId",getNotifications)
module.exports = router
