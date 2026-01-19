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
// ================= FACULTY SEED =================
exports.seedFaculty = async(req,res)=>{
  try{
    const faculty = {
      name: "Alok Patel",
      email: "faculty@college.edu",
      password: "faculty123",
      role: "faculty"
    }

    await User.create(faculty)
    res.json("Faculty Seeded Successfully")
  }catch(err){
    res.status(500).json(err.message)
  }
}
exports.resetUser = async (req, res) => {
  const { email } = req.body;
  await User.deleteOne({ email });
  res.json("User Reset Successfully");
};
