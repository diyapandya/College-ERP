const mongoose = require("mongoose")

const mentorSchema = new mongoose.Schema({
  division: String, // 6P
  mentors: [String] // facultyId[]
})

module.exports = mongoose.model("Mentor", mentorSchema)
