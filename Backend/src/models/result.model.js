
const mongoose = require("mongoose")
const resultSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  semester: String,
  marks: Number,
 
})
module.exports = mongoose.model("Result", resultSchema)