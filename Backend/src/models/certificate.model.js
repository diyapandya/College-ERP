const mongoose = require("mongoose")

const certSchema = new mongoose.Schema({
  studentId:String,
  eventType:String,
  title:String,
  category:String, //seminar/ncc/sports/IEEE/Xenesis
  year:Number,
  role:String,
  notes:String,
  fileUrl:String
})

module.exports = mongoose.model("Certificate", certSchema)
