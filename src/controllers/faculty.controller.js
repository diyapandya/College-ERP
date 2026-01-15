const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
// Submit / Update Attendance
exports.submitAttendance = async (req, res) => {
  try {
    const { studentId, subject, totalLectures, attendedLectures } = req.body

    const percentage = (attendedLectures / totalLectures) * 100
    const risk = percentage < 75

    const record = await Attendance.findOneAndUpdate(
      { studentId, subject },
      { totalLectures, attendedLectures, percentage, risk },
      { upsert: true, new: true }
    )

    const atRiskList = await Attendance.find({ risk: true })

    res.json({
      message: "Attendance updated successfully",
      updatedRecord: record,
      atRiskStudents: atRiskList
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get At-Risk Students
exports.getAttendance = async(req,res)=>{
  const data = await Attendance.find({studentId:req.params.studentId})
  res.json(data)
}

exports.getAtRiskStudents = async(req,res)=>{
  const list = await Attendance.find({risk:true})
  res.json(list)
}

// Submit / Update Marks
exports.submitMarks = async(req,res)=>{
  const {studentId,subject,internal1,internal2,assignment} = req.body

  const total = internal1 + internal2 + assignment

  const record = await Marks.findOneAndUpdate(
    {studentId,subject},
    {internal1,internal2,assignment,total},
    {upsert:true,new:true}
  )

  res.json(record)
}