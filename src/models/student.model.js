const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  studentId:String,
  name:String,
  division:String,
  enrollment:String,
  abcId:String,
  aadhaarMasked:String,
  bloodGroup:String,
  phone:String,
  email:String,
  address:String,
  parentName:String,
  parentPhone:String,
  parentEmail:String
})

module.exports = mongoose.model("Student", studentSchema)
