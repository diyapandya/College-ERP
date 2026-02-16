const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "faculty", "parent", "admin"],
    required: true,
  },

  department: {
    type: String,
  },

  semester: {
    type: Number,
  },

  enrollmentNo: {
    type: String,
    unique: true,
    sparse: true,
  },

  linkedFacultyId: {
    type: String,
    unique: true,
    sparse: true,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
