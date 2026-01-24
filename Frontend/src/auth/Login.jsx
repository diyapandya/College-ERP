import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import aiImage from "../assets/login.png"; 

import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const nav = useNavigate();
  const split = "Hey, you!".split("");
  const pendingEmail = localStorage.getItem("pendingEmail");
const { login: saveSession } = useAuth();

  const login = async () => {
    try {
      // OTP Verification First
     if (pendingEmail) {
  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  await api.post("/auth/verify-signup-otp", {
    email: pendingEmail,
    otp
  });

  localStorage.removeItem("pendingEmail");
  alert("OTP verified. Logging you in...");
}


      const res = await api.post("/auth/login", { email, password })

localStorage.setItem("token", res.data.token)

// ✅ SAVE FULL USER PAYLOAD
saveSession({
  id: res.data.id,
  name: res.data.name,
  role: res.data.role,
  linkedStudentId: res.data.linkedStudentId || null
})

// 🚦 ROUTING AFTER LOGIN
if (res.data.role === "student") nav("/student")
if (res.data.role === "faculty") nav("/faculty")
if (res.data.role === "parent") nav("/parent")
if (res.data.role === "admin") nav("/admin")
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Login");
    }
  };
  {/* FLOAT ANIMATION */}
<style>{`
  @keyframes float {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-18px); }
    100% { transform: translateY(0px); }
  }
`}</style>


  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40
    }}>
      <div style={{
        width: "100%",
        maxWidth: 1100,
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 40px 90px rgba(15,23,42,.12)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden"
      }}>

        {/* LEFT GRADIENT */}

                {/* Glow Background */}
<div
  style={{
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    top: 40,
    left: 40,
    filter: "blur(60px)"
  }}
/>

<div
  style={{
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    bottom: 60,
    right: 60,
    filter: "blur(50px)"
  }}
/>

        <div style={{
          background: "linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
          color: "#fff",
          padding: 70,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",       
    textAlign: "center",
    position: "relative"
        }}>

  
          <motion.h1 style={{ fontSize: 46, marginBottom: 12, display: "flex", gap: 4 }}>
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
          {/* FLOATING IMAGE */}
<motion.img
  src={aiImage}
  alt="AI Education"
  style={{
    width: 360,
    marginTop: 40,
    animation: "float 4s ease-in-out infinite",
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
      repeat: Infinity,
      repeatType: "loop"
    }}
  />


        </div>

        {/* FORM */}
        <div style={{ padding: 60 }}>
          <h2 style={{ fontSize: 30, marginBottom: 10 }}>LDRP ERP Login</h2>
          <p style={{ color: "#64748B", marginBottom: 30 }}>Enter your credentials</p>

          <input placeholder="Email address" style={input} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" style={input} onChange={e => setPassword(e.target.value)} />

      
            <input
              placeholder="Enter OTP to verify account"
              style={input}
              onChange={e => setOtp(e.target.value)}
            />
          

          <button onClick={login} style={btn}>Login</button>

          <p style={{ marginTop: 20, color: "#64748B" }}>
            Don’t have an account? <Link to="/signup" style={{ color: "#5B2EFF" }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

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
  cursor: "pointer",
};
