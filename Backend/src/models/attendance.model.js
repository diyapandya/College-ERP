const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  slot: {
    start: String,
    end: String
  },

  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  branch: String,
  semester: Number,
  division: String,
  batch: String,

  status: {
    type: String,
    enum: ["present", "absent"],
    required: true
  }

}, {
  timestamps: true
});


/* ================= INDEX FOR PERFORMANCE ================= */

attendanceSchema.index({
  studentId: 1,
  subject: 1,
  date: 1
});


module.exports = mongoose.model("Attendance", attendanceSchema);
