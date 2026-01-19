const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { generateOTP } = require("../services/auth.service");

/* ================= REGISTER (OTP VERIFIED ACCOUNT) ================= */
exports.register = async (req, res) => {
  try {
    console.log("🔥 REGISTER API HIT");
    const { name, email, password, role, linkedStudentId, linkedFacultyId } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const otp = generateOTP();
    const hash = await bcrypt.hash(password, 10);

   const user = await User.create({
  name,
  email,
  password: hash,
  role,
  linkedStudentId: role === "student" ? linkedStudentId : null,
  linkedFacultyId: role === "faculty" ? linkedFacultyId : null,
  otp,
  otpExpiry: Date.now() + 10 * 60 * 1000,
  isVerified: false
});
    console.log("🔐 SIGNUP OTP (DEV MODE):", otp);

    res.status(201).json({
      message: "OTP sent (DEV MODE)",
      otp    // return for testing (remove in production)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // 🔐 OTP Verification Check
    if (!user.isVerified)
      return res.status(401).json({ message: "Verify OTP before login" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    linkedStudentId: user.linkedStudentId || null,
    linkedFacultyId: user.linkedFacultyId || null
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
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
    linkedStudentId: user.linkedStudentId || null,
  linkedFacultyId: user.linkedFacultyId || null
  }
});

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= FORGOT PASSWORD ================= */
/* ================= FORGOT PASSWORD (DEV MODE) ================= */
exports.forgotPassword = async (req, res) => {
  try {
    console.log("🔥 FORGOT PASSWORD API HIT");
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    console.log("🔐 DEV OTP:", otp);   // OTP printed in terminal

    res.json({
      message: "OTP generated.",
      otp: otp     // OTP returned for Postman & frontend testing
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= VERIFY SIGNUP OTP ================= */
exports.verifySignupOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp,
    otpExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: "Account verified successfully" });
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

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
}
