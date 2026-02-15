import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import aiImage from "../assets/login.png";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {

  const nav = useNavigate();
  const { login: saveSession } = useAuth();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
   const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const split = "Hey, you!".split("");

  /* ================= LOGIN FUNCTION ================= */
const handleLogin = async () => {
  try {

    const res = await api.post("/auth/login", {
      email,
      enrollmentNo: role === "student" ? enrollmentNo : null,
      linkedFacultyId: role === "faculty" ? facultyId : null,
      password,
      otp
    });

    localStorage.setItem("token", res.data.token);
    saveSession(res.data.user);

    if (res.data.role === "student") nav("/student");
    if (res.data.role === "faculty") nav("/faculty");
    if (res.data.role === "parent") nav("/parent");

  } catch (err) {

    // If OTP required
    if (err.response?.data?.message === "Account not verified. Enter OTP.") {
      alert("Enter OTP sent during signup (check console)");
      setOtpStep(true);
      return;
    }

    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 40px 90px rgba(15,23,42,.12)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
          position: "relative"
        }}
      >

        {/* LEFT SIDE */}
        <div
          style={{
            background: "linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
            color: "#fff",
            padding: 70,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <motion.h1
            style={{ fontSize: 46, marginBottom: 12, display: "flex", gap: 4 }}
          >
            {split.map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </motion.h1>

          <p style={{ opacity: 0.9 }}>
            Login to continue to your dashboard.
          </p>

          <motion.img
            src={aiImage}
            alt="AI Education"
            style={{
              width: 360,
              marginTop: 40,
              filter: "drop-shadow(0 30px 45px rgba(91,46,255,.35))"
            }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 1.5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div style={{ padding: 60 }}>
          <h2 style={{ fontSize: 30, marginBottom: 10 }}>
            College ERP Login
          </h2>

          <p style={{ color: "#64748B", marginBottom: 30 }}>
            Enter your credentials
          </p>

          {/* ROLE SELECT */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={input}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="parent">Parent</option>
          </select>

         

          {/* STUDENT FIELD */}
          {role === "student" && (
            <input
              placeholder="Enrollment No (e.g. 23BECE30494)"
              style={input}
              pattern="^[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{3}$"
              title="Format: 23BECE30494"
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              required
            />
          )}

          {/* FACULTY FIELD */}
          {role === "faculty" && (
            <input
              placeholder="Faculty ID"
              style={input}
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
          )}
           {/* EMAIL FIELD */}
          <input
            type="email"
            placeholder="Email Address"
            style={input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            style={input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* OTP FIELD (only after step 1) */}
        
          <input
            placeholder="Enter OTP"
            style={input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        
          <button onClick={handleLogin} style={btn}>
            Login
          </button>

          <p style={{ marginTop: 20, color: "#64748B" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#5B2EFF" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const input = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  marginBottom: 16,
  outline: "none",
  fontSize: 15
};

const btn = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer"
};
