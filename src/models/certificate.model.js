const mongoose = require("mongoose")

const certSchema = new mongoose.Schema({
  studentId:String,
  eventType:String,
  title:String,
  year:String,
  role:String,
  notes:String,
  fileUrl:String
})

module.exports = mongoose.model("Certificate", certSchema)
