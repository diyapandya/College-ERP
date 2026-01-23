const Mentor = require("../models/mentor.model")
const Attendance = require("../models/attendance.model")

exports.syncMentorDashboard = async(division)=>{

  const mentors = await Mentor.findOne({division})

  if(!mentors) return

  const data = await Attendance.find({division})

  // Store or cache for mentors (Redis / DB later)
}
