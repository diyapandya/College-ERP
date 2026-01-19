const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  dueDate: Date,
  branch: String,
  division: String,
  semester: String,
  facultyId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty"
  },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Assignment", assignmentSchema)
