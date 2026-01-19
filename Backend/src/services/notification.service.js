/**
 * notification.service.js
 * -----------------------
 * Central notification engine
 * DO NOT put business logic in controllers
 */

const Student = require("../models/student.model")
const Notification = require("../models/notification.model")

/* =====================================================
   MARKS NOTIFICATION
   ===================================================== */
exports.sendMarksNotification = async ({
  studentId,
  subject,
  total
}) => {
  try {
    const student = await Student.findOne({ studentId })
    if (!student) return

    // ✅ SAVE NOTIFICATION FOR STUDENT DASHBOARD
    await Notification.create({
      studentId,
      title: `📝 Marks updated for ${subject} (Total: ${total})`,
      type: "marks"
    })

    /* ---------------- OPTIONAL (LOG / SMS / EMAIL) ---------------- */
    console.log("📢 MARKS NOTIFICATION")
    console.log("Student:", student.name)
    console.log("Subject:", subject)
    console.log("Total Marks:", total)

  } catch (err) {
    console.error("❌ Marks Notification Error:", err.message)
  }
}

/* =====================================================
   ATTENDANCE RISK ALERT
   ===================================================== */
exports.sendAttendanceRiskAlert = async ({
  studentId,
  subject,
  attendancePercent
}) => {
  try {
    const student = await Student.findOne({ studentId })
    if (!student) return

    // ✅ SAVE NOTIFICATION
    await Notification.create({
      studentId,
      title: `⚠️ Attendance below 75% in ${subject} (${attendancePercent}%)`,
      type: "attendance"
    })

    console.log("🚨 ATTENDANCE RISK ALERT")
    console.log("Student:", student.name)
    console.log("Subject:", subject)
    console.log("Attendance:", attendancePercent + "%")

  } catch (err) {
    console.error("❌ Attendance Alert Error:", err.message)
  }
}
