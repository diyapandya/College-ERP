const Message = require("../models/message.model")

exports.sendMessage = async(req,res)=>{
  const msg = await Message.create(req.body)
  res.json(msg)
}

exports.getConversation = async(req,res)=>{
  const userId = req.params.userId
  const msgs = await Message.find({
    $or:[{fromId:userId},{toId:userId}]
  })
  res.json(msgs)
}
