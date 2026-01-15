const Notification = require("../models/notification.model")

exports.createNotification = async(req,res)=>{
  const n = await Notification.create(req.body)
  res.json(n)
}

exports.getNotifications = async(req,res)=>{
  res.json(await Notification.find({userId:req.params.userId}))
}
