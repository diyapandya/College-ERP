const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true,  required: true,},
  password:String,
  role:{type:String,enum:['student','faculty','parent','admin']},
  linkedStudentId:String,
   isVerified: { type: Boolean, default: false },
   linkedFacultyId:String,
   isVerified: { type: Boolean, default: false },
  otp: Number,
otpExpiry: Date
})

module.exports = mongoose.model("User", userSchema)
