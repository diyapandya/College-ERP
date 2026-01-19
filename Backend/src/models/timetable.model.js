const mongoose = require("mongoose")

const timetableSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty"
  },
  subject: String,
  branch: String,
  semester: Number,
  division: String,
  day: String,
  startTime: String,
  endTime: String,
  room: String
})
module.exports = mongoose.model("Timetable", timetableSchema);