const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")

exports.getMonthlySummary = async(req,res)=>{
  const studentId=req.params.studentId
  const att=await Attendance.find({studentId})
  const mk=await Marks.find({studentId})

  const avgAtt = att.reduce((s,a)=>s+a.percentage,0)/(att.length||1)
  const avgMarks = mk.reduce((s,m)=>s+m.total,0)/(mk.length||1)

  res.json({avgAtt,avgMarks})
}
