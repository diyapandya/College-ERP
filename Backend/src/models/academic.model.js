const mongoose = require("mongoose");

const AcademicSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  subject: String,
  grade : String,
  attendancePercent: Number,
  internalMarks: Number,
  universityMarks: Number,
  academicHealth: Number,
  eligibilityStatus: {
  type: String,
  enum: ["Eligible", "At Risk", "Not Eligible"],
  default: "Not Eligible"
},
  riskFlag: Boolean,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Academic", AcademicSchema);
