const router = require('express').Router()
const { register, login,forgotPassword,resetPassword,verifySignupOTP,getMe } = require('../controllers/auth.controller')
const auth = require("../middleware/auth.middleware")

router.post('/register', register)
router.post('/login', login)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-signup-otp", verifySignupOTP);
router.get("/me", auth, getMe)

module.exports = router
