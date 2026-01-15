const User = require("../models/user.model")
const Student = require("../models/student.model")

exports.seedStudents = async(req,res)=>{
  const list = req.body
  const users = list.map(s=>({
    name:s.name,
    email:s.email,
    password:"12345",
    role:"student"
  }))
  await User.insertMany(users)
  await Student.insertMany(list)
  res.json("Seeded")
}
