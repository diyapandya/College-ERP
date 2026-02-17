const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../services/auth.service");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    console.log("🔥 REGISTER API HIT");

    const {
      name,
      email,
      department,
      semester,
      password,
      role,
      enrollmentNo,
      linkedFacultyId,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }
    // ✅ Enrollment validation for students
    if (role === "student") {
      const enrollmentRegex = /^[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{3}$/;
      if (!enrollmentNo || !enrollmentRegex.test(enrollmentNo)) {
        return res
          .status(400)
          .json({ message: "Invalid Enrollment Number format" });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    // ✅ OTP for ALL USERS
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    console.log("🔐 SIGNUP OTP (DEV MODE):", otp);

    await User.create({
      name,
      email,
      password: hash,
      role,
      enrollmentNo: role === "student" ? enrollmentNo : undefined,
      linkedFacultyId: role === "faculty" ? linkedFacultyId : undefined,
      otp,
      department,
      semester: Number(semester),
      otpExpiry,
      isVerified: false,
    });

    res.status(201).json({
      message: "OTP sent for verification",
      otp, // remove in production
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= LOGIN ================= */
/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, enrollmentNo, linkedFacultyId, password, otp } = req.body;

    let user = null;

    if (email) {
      user = await User.findOne({ email });
    } else if (enrollmentNo) {
      user = await User.findOne({ enrollmentNo });
    } else if (linkedFacultyId) {
      user = await User.findOne({ linkedFacultyId });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // ✅ Password check first
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Step 1: If account not verified → require OTP
    if (!user.isVerified) {
      // If OTP not provided
      if (!otp) {
        return res.status(400).json({
          message: "Account not verified. Enter OTP.",
        });
      }

      // Verify OTP
      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({
          message: "Invalid or expired OTP",
        });
      }

      // Mark verified
      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* ================= RESEND OTP ================= */
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log("🔐 RESEND OTP (DEV MODE):", otp);

    res.json({
      message: "OTP resent successfully",
      otp, // remove in production
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    console.log("🔥 FORGOT PASSWORD API HIT");

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log("🔐 DEV OTP:", otp);

    res.json({
      message: "OTP generated",
      otp, // remove in production
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= VERIFY SIGNUP OTP ================= */
exports.verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET CURRENT USER ================= */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
