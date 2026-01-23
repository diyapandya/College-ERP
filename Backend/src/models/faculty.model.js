const mongoose = require("mongoose")

const facultySchema = new mongoose.Schema({
  facultyId: String, // ex: FAC001
  name: String,
  email: String,

  department: String, // CE / IT
  designation: String,

  mentorDivisions: [String], // ["6P","6Q"]

  subjects: [
    {
      subject: String,
      semester: Number,
      division: String,
      batch: String // P1,P2,P3 (optional)
    }
  ]
})

module.exports = mongoose.model("Faculty", facultySchema)
