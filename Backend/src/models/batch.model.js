const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
  branch: String,
  semester: Number,
  division: String, // P
  batch: String,    // P1

  students: [String] // studentId[]
})

module.exports = mongoose.model("Batch", batchSchema)
