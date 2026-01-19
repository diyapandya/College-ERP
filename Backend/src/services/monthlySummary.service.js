const Academic = require("../models/academic.model")
const MonthlySummary = require("../models/monthlySummary.model")

exports.generateMonthlySummaries = async () => {
  const month = new Date().toISOString().slice(0, 7) // YYYY-MM

  const academicRecords = await Academic.find()

  for (const record of academicRecords) {
    await MonthlySummary.findOneAndUpdate(
      { studentId: record.studentId, month },
      {
        studentId: record.studentId,
        month,
        attendancePercent: record.attendancePercent,
        internalMarks: record.internalMarks,
        academicHealth: record.academicHealth,
        eligibilityStatus: record.eligibilityStatus,
        riskFlag: record.riskFlag
      },
      { upsert: true }
    )
  }

  console.log(`📊 Monthly Academic Summary generated for ${month}`)
}
