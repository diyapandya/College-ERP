const Notification = require("../models/notification.model")

exports.createNotification = async (req, res) => {
  const n = await Notification.create(req.body)
  res.json(n)
}

/* ❌ REMOVE userId PARAM LOGIC */
exports.getNotifications = async (req, res) => {
  res.json(await Notification.find())
}

/* ✅ ADD THIS (THIS IS WHAT YOU NEED) */
exports.getMyNotifications = async (req, res) => {
  const list = await Notification.find({
    studentId: req.user.linkedStudentId
  }).sort({ createdAt: -1 })

  res.json(list)
}
