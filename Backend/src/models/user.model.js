const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
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

    /* ---------------- Academic Info ---------------- */

    department: {
      type: String,
       required: function () {
        return this.role === "student";
      },
      trim: true,
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
       required: function () {
        return this.role === "student";
      },
    },

    division: {
      type: String,
     required: function () {
        return this.role === "student";
      },
      trim: true,
    },

    /* ---------------- Role Based Fields ---------------- */

    enrollmentNo: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return this.role === "student";
      },
      uppercase: true,
      trim: true,
    },

    linkedFacultyId: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return this.role === "faculty";
      },
      trim: true,
    },

    /* ---------------- OTP & Verification ---------------- */

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
