const Attendance = require("../models/attendance.model")
const Marks = require("../models/marks.model")
const Academic = require("../models/academic.model")

/* =====================================================
   ✅ CENTRAL ELIGIBILITY ENGINE
   ===================================================== */

exports.evaluate = async (studentId) => {

  try {

    const att = await Attendance.find({ studentId })
    const mk = await Marks.find({ studentId })


    /* ---------------- ATTENDANCE % ---------------- */

    const presentCount =
      att.filter(a => a.status === "Present").length

    const totalLectures = att.length || 1   // prevent divide by 0

    const attAvg =
      Math.round((presentCount / totalLectures) * 100)


    /* ---------------- MARKS AVG ---------------- */

    const totalMarks =
      mk.reduce((s, m) => s + (m.marks || 0), 0)

    const totalSubjects = mk.length || 1

    const marksAvg =
      Math.round(totalMarks / totalSubjects)


    /* ---------------- ELIGIBILITY ---------------- */

    let status = "Eligible"

    if (attAvg < 75 || marksAvg < 40) {
      status = "Not Eligible"
    }


    /* ---------------- SAVE TO ACADEMIC ---------------- */

    await Academic.updateMany(
      { studentId },
      { eligibilityStatus: status }
    )


    return {
      status,
      attendancePercent: attAvg,
      marksAverage: marksAvg
    }

  } catch (err) {

    console.error("Eligibility Error:", err.message)

    return {
      status: "Error",
      attendancePercent: 0,
      marksAverage: 0
    }
  }
}
