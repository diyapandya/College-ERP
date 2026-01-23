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
  room: String,
  /* =====================================================
     ✅ SUBSTITUTE FACULTY SYSTEM
     ===================================================== */

  substituteFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Remarks while assigning substitute
  remarks: String,

  // Is this lecture substituted?
  isSubstituted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true // ✅ Helpful for tracking changes
})

module.exports = mongoose.model("Timetable", timetableSchema);