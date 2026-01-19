const mongoose = require("mongoose")

const disputeSchema = new mongoose.Schema({
  studentId:String,
  subject:String,
  issue:String,
  status:{type:String,default:"Open"},
  remarks:String
})

module.exports = mongoose.model("Dispute", disputeSchema)
