const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
  studentId:String,
  subject:String,
  totalLectures:Number,
  attendedLectures:Number,
  percentage:Number,
  risk:Boolean
})

module.exports = mongoose.model("Attendance", attendanceSchema)
