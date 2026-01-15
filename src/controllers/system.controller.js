const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")

exports.evaluateEligibility = async(req,res)=>{
  const studentId = req.params.studentId
  const attendance = await Attendance.find({studentId})
  const marks = await Marks.find({studentId})

  let status = "Eligible"
  let reasons = []

  attendance.forEach(a=>{
    if(a.percentage < 75){
      status="Not Eligible"
      reasons.push(`${a.subject} attendance low`)
    }
  })

  marks.forEach(m=>{
    if(m.total < 40){
      status="Not Eligible"
      reasons.push(`${m.subject} internal marks low`)
    }
  })

  res.json({status,reasons})
}

exports.calculateHealthScore = async(req,res)=>{
  const studentId = req.params.studentId
  const attendance = await Attendance.find({studentId})
  const marks = await Marks.find({studentId})

  let aAvg = attendance.reduce((s,a)=>s+a.percentage,0)/(attendance.length||1)
  let mAvg = marks.reduce((s,m)=>s+m.total,0)/(marks.length||1)

  const score = Math.round((aAvg*0.5) + (mAvg*0.5))

  let color="🟢"
  if(score<60) color="🔴"
  else if(score<75) color="🟡"

  res.json({score,color})
}
