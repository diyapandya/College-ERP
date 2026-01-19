import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const nav = useNavigate();
  const split = "Hello, you!".split("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target));

    try {
      const res = await axios.post("/auth/register", form);
      if (res.status === 200 || res.status === 201) {
         localStorage.setItem("pendingEmail", form.email);
      alert("Signup Successful!");
      
      nav("/login");
    } }
    catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%",
        maxWidth: 1100,
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 40px 90px rgba(15,23,42,.12)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden"
      }}>

        {/* LEFT WELCOME */}
        <div style={{
          background: "linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
          color: "#fff",
          padding: 70,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
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
            Create your ERP account and get started.
          </p>
        </div>

        {/* FORM */}
        <div style={{ padding: 60 }}>
          <h2 style={{ fontSize: 30, marginBottom: 10 }}>Create Account</h2>
          <p style={{ color: "#64748B", marginBottom: 30 }}>Choose your role</p>

          <input name="name" placeholder="Full Name" style={input} required />
          <input name="email" placeholder="Email address" style={input} required />
          <input name="password" type="password" placeholder="Create strong password" style={input} required />

          <select
  name="role"
  style={input}
  required
  onChange={(e) => setRole(e.target.value)}
>
  <option value="student">Student</option>
  <option value="faculty">Faculty</option>
  <option value="parent">Parent</option>
</select>
{role === "student" && (
  <input
    name="linkedStudentId"
    placeholder="Student ID (e.g. STU001)"
    style={input}
    required
  />
)}

{role === "faculty" && (
  <input
    name="linkedFacultyId"
    placeholder="Faculty ID (e.g. FAC101)"
    style={input}
    required
  />
)}

          <button type="submit" style={btn}>Create Account</button>

          <p style={{ marginTop: 20, color: "#64748B" }}>
            Already have an account? <Link to="/login" style={{ color: "#5B2EFF" }}>Login</Link>
          </p>
        </div>

      </form>
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
  fontSize: 15,
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
