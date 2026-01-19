const mongoose = require("mongoose")

const monthlySummarySchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  month: { type: String, required: true }, // e.g. "2026-01"

  attendancePercent: Number,
  internalMarks: Number,
  academicHealth: Number,
  eligibilityStatus: String,
  riskFlag: Boolean,

  generatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("MonthlySummary", monthlySummarySchema)
