const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
const Student = require("../models/student.model")
const Certificate = require("../models/certificate.model")
// Get Attendance Records for a Student
exports.getAttendance = async(req,res)=>{
  const data = await Attendance.find({studentId:req.params.studentId})
  res.json(data)
}

exports.getMarks = async(req,res)=>{
  const data = await Marks.find({studentId:req.params.studentId})
  res.json(data)
}

exports.saveProfile = async(req,res)=>{
  const data = await Student.findOneAndUpdate(
    {studentId:req.body.studentId},
    req.body,
    {upsert:true,new:true}
  )
  res.json(data)
}

exports.getStudentProfile = async(req,res)=>{
  const data = await Student.findOne({studentId:req.params.studentId})
  res.json(data)
}

exports.addCertificate = async(req,res)=>{
  const cert = await Certificate.create(req.body)
  res.json(cert)
}

exports.getCertificates = async(req,res)=>{
  res.json(await Certificate.find({studentId:req.params.studentId}))
}
