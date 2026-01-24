
const btn={
padding:"8px 16px",borderRadius:20,border:"1px solid #ddd",marginLeft:8,background:"#fff"
}

const cta={
padding:"14px 32px",borderRadius:30,border:0,background:"#fff",color:"#5B2EFF",margin:10
}


const footTitle = {
  color: "#FF8A3D",
  marginBottom: 18,
  fontWeight: 600,
  fontSize: 18,
};

const footLink = {
  marginBottom: 10,
  cursor: "pointer",
  color: "#CBD5E1",
  transition: "0.3s",
};

const aboutPara = {
  color: "#475569",
  lineHeight: 1.75,
  fontSize: 15,
  marginBottom: 18,
  textAlign: "justify",
};

const ruleCard = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: 18,
  padding: "26px 30px",
  width: 420,
  boxShadow: "0 15px 40px rgba(15,23,42,.08)",
  lineHeight: 1.6,
  color: "#334155",
};


/* ================= TILT CARD ================= */

const spring = {
  damping: 25,
  stiffness: 120,
  mass: 1.5
};

function TiltCard({ title, desc }) {
  const ref = useRef(null);

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    rotateX.set((-y / rect.height) * 18);
    rotateY.set((x / rect.width) * 18);
  }

  function handleEnter() {
    scale.set(1.05);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <figure
      ref={ref}
      style={{ perspective: 900 }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          background:"#FFFFFF",
          borderRadius: 22,
          padding: 28,
          minHeight: 180,
          border: "3px solid rgba(255,255,255,.6)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 18px 40px rgba(15,23,42,.12)"
        }}
      >
        <h3 style={{ marginBottom: 12 }}>{title}</h3>
        <p style={{ color: "#475569" }}>{desc}</p>
      </motion.div>
    </figure>
  );
}


import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import React, { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import logo from "../assets/collegeerp.png";
import video from "../assets/hero.mp4";
import ksv from "../assets/ksv.svg";
import svkm from "../assets/svkm.svg";



/* ================= NAV ITEM ================= */

function NavItem({ text,target }) {
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href={`#${target}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        textDecoration: "none",
        color: hover ? "#5B2EFF" : "#0F172A",
        fontWeight: hover ? 600 : 500,
        padding: "6px 2px",
        transition: "0.3s",
      }}
    >
      {text}

      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-6px",
          width: hover ? "70%" : "0%",
          height: "2px",
          background: "linear-gradient(90deg,#5B2EFF,#CB3CFF,#FF8A3D)",
          transform: "translateX(-50%)",
          transition: "0.3s",
        }}
      />
    </a>
  );
}
/* ================= MAIN COMPONENT ================= */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
    style={{
       minHeight: "100vh",
         background:
        "linear-gradient(135deg, rgba(91,46,255,.08), rgba(203,60,255,.08), rgba(255,138,61,.08))"
    }}
    >
    {/* ================= NAVBAR ================= */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
       
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 25px rgba(0,0,0,0.05)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
         
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
          
      <img src={logo} style={{ height: 62 }}/>
     
   
          <span>
            <b style={{ color: "#5B2EFF" }}>College</b>ERP 
          </span>
           <span>
            <b style={{ color: "#000000" }}>@KSV</b>
          </span>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", gap: "22px", fontSize: "18px" }}>
  <NavItem text="Home" target="home"/>
  <NavItem text="Features" target="features"/>
  <NavItem text="User Roles" target="user roles"/>
  <NavItem text="Rules" target="rules"/>
  <NavItem text="About Us" target="about us"/>
  <NavItem text="Contact" target="contact"/>
</div>

    


        {/* BUTTON */}
        <div style={{ display: "flex", gap: "12px"}}>
          {/* LOGIN */}
          <button
            onClick={() => navigate("/login")}
            style={{
      padding: "8px 22px",
      borderRadius: "22px",
      background: "#FFFFFF",
      color: "#5B2EFF",
      border: "2px solid transparent",
      fontSize: "18px",
      cursor: "pointer",
      backgroundImage: "linear-gradient(#fff,#fff), linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
      boxShadow: "0 0 10px rgba(203,60,255,0.4)",
      transition: "0.3s",
    }}
  >
    Login
  </button>

  {/* SIGNUP */}
  <button
    onClick={() => navigate("/signup")}
    style={{
      padding: "8px 22px",
      borderRadius: "22px",
      background: "#FFFFFF",
      color: "#FF8A3D",
      border: "2px solid transparent",
      fontSize: "18px",
      cursor: "pointer",
      backgroundImage: "linear-gradient(#fff,#fff), linear-gradient(135deg,#FF8A3D,#CB3CFF,#5B2EFF)",
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
      boxShadow: "0 0 12px rgba(255,138,61,0.5)",
      transition: "0.3s",
    }}
  >
    Sign Up
  </button>
  </div>
   <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
          
      <img src={svkm} style={{ height: 62 }}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
          
      <img src={ksv} style={{ height: 62 }}/>
      </div>
    </div>

</div>
{/* RESPONSIVE FIX */}
  <style>{`
    @media (max-width: 900px) {
      section > div { grid-template-columns: repeat(2,1fr); }
    }
    @media (max-width: 600px) {
      section > div { grid-template-columns: 1fr; }
    }
  `}</style>

      
    {/* ================= CINEMATIC HERO ================= */}
<section id="home"
  style={{
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#0F172A,#020617)",
  }}
>
  {/* VIDEO BACKGROUND */}
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.7,
    }}
  >
    <source src={video} type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg,rgba(15,23,42,.85),rgba(15,23,42,.95))",
    }}
  />

  {/* HERO TEXT */}
  <div
    style={{
      position: "relative",
      zIndex: 5,
      textAlign: "center",
      maxWidth: 800,
      margin: "auto",
      color: "#fff",
      padding: "0 20px",
    }}
  >
    <h1
      style={{
        fontSize: 56,
        fontWeight: 800,
        marginBottom: 20,
        letterSpacing: "-1px",
      }}
    >
      <Typewriter
        words={["Welcome to College ERP"]}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </h1>

    <p style={{ fontSize: 20, color: "#CBD5E1" }}>
      Smart Academic Automation Platform
    </p>
  </div>
</section>


    {/* ================= FEATURES ================= */}
<section id="features"
  style={{
    maxWidth: 1200,
    margin: "50PX auto",
    padding: "80px",
    

  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: 36,
      marginBottom: 70,
      color: "#0F172A",
      fontWeight: 700,
      letterSpacing: "-0.5px"
    }}
  >
    Features
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 32
    }}
  >
    {[
      ["Instant Marks Notification","Automatically sends marks and remarks to students and parents through secure notifications after faculty entry."],
      ["Attendance Risk Alert","Monitors attendance continuously and alerts stakeholders when attendance falls below the required threshold."],
      ["KSV Exam Eligibility Checker","Evaluates subject-wise eligibility based on official KSV academic rules and institutional criteria."],
      ["Academic Health Score","Calculates a consolidated academic performance score using attendance, marks, and submission trends."],
      ["Missed Class Recovery Tracker","Identifies missed lectures and provides structured recovery material and guidance for students."],
      ["Parent–Faculty Messaging","Enables secure and transparent communication between parents and faculty within the platform."],
      ["Internal Marks Dispute System","Provides a formal digital channel for raising and resolving marks-related queries."],
      ["Monthly Academic Summary","Automatically generates and delivers monthly academic progress summaries to parents and mentors."],
      ["Student Profile & Academic Record Vault","Maintains a centralized digital academic record and mentoring file for each student."]
    ].map(([title, desc]) => (
      <TiltCard
    key={title}
    title={title}
    desc={desc}
  />
    ))}
    </div>

  {/* RESPONSIVE FIX */}
  <style>{`
    @media (max-width: 900px) {
      section > div { grid-template-columns: repeat(2,1fr); }
    }
    @media (max-width: 600px) {
      section > div { grid-template-columns: 1fr; }
    }
  `}</style>
</section>

{/* ================= USER ROLES ================= */}
<section id="user roles"
  style={{
    maxWidth: 1200,
    margin: " 50PX auto",
    padding: "80px",
    borderRadius: 28,
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: 34,
      marginBottom: 60,
      color: "#0F172A",
      fontWeight: 700,
    }}
  >
    System User Roles
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 28,
    }}
  >
    {[
      [
        "Student",
        "Accesses academic records, attendance status, marks, eligibility, recovery materials, certificates, and personal profile information."
      ],
      [
        "Faculty",
        "Enters marks, attendance, manages queries, monitors at-risk students, and communicates with parents and mentors."
      ],
      [
        "Mentor / Admin",
        "Supervises mentoring activities, monitors academic health, manages eligibility rules, and oversees system operations."
      ],
      [
        "Parent",
        "Views student progress, receives alerts, monthly summaries, and communicates securely with faculty."
      ],
    ].map(([title, desc]) => (
      <div
        key={title}
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 18,
          padding: "28px 26px",
          minHeight: 200,
          boxShadow: "0 10px 30px rgba(15,23,42,.05)",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 20px 45px rgba(15,23,42,.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(15,23,42,.05)";
        }}
      >
        <h3 style={{ marginBottom: 12, color: "#0F172A", fontSize: 18, fontWeight: 600 }}>
          {title}
        </h3>
        <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.65 }}>
          {desc}
        </p>
      </div>
    ))}
  </div>

  {/* RESPONSIVE */}
  <style>{`
    @media (max-width: 900px) {
      section > div { grid-template-columns: repeat(2,1fr); }
    }
    @media (max-width: 600px) {
      section > div { grid-template-columns: 1fr; }
    }
  `}</style>
</section>

   {/* ================= HOW IT WORKS ================= */}
{/* ================= HOW IT WORKS ================= */}
<section
  id="rules"
  style={{
    maxWidth: 1200,
    margin: "80px auto",
    padding: "100px 60px",
    position: "relative"
  }}
>
  {/* TITLE */}
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    style={{
      textAlign: "center",
      fontSize: 36,
      marginBottom: 90,
      color: "#0F172A",
      fontWeight: 700
    }}
  >
    How the College ERP Works
  </motion.h2>

  <div style={{ position: "relative" }}>

    

    {[
      ["Faculty Inputs Data","Faculty enter attendance, marks and assessments into the ERP system."],
      ["System Applies KSV Rules","Eligibility rules and academic logic are automatically applied."],
      ["Risk Detection","At-risk students are identified based on attendance and marks."],
      ["Notifications Sent","Students and parents receive instant alerts & summaries."],
      ["Mentor Monitoring","Mentors monitor health scores, recovery actions and risk lists."],
      ["Continuous Improvement","ERP continuously improves academic compliance & outcomes."]
    ].map(([title, desc], i) => (

      <motion.div
        key={i}

        /* ANIMATION */
        initial={{
          opacity: 0,
          x: i % 2 === 0 ? 80 : -80,
          scale: 0.9
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1
        }}
        transition={{
          duration: 0.7,
          delay: i * 0.1
        }}
        viewport={{ once: true }}

        style={{
          display: "flex",
          justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
          marginBottom: 50
        }}
      >
        {/* CARD */}
        <div
          style={{
            width: "45%",
            background: "#fff",
            borderRadius: 20,
            padding: "26px 28px",
            display: "flex",
            gap: 22,
            alignItems: "flex-start",
            boxShadow: "0 18px 45px rgba(15,23,42,.12)",
            border: "1px solid rgba(255,255,255,.6)"
          }}
        >
          {/* NUMBER */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 17,
              flexShrink: 0,
              boxShadow: "0 10px 25px rgba(91,46,255,.4)"
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* TEXT */}
          <div>
            <h3
              style={{
                marginBottom: 8,
                color: "#0F172A",
                fontSize: 17,
                fontWeight: 600
              }}
            >
              {title}
            </h3>

            <p
              style={{
                color: "#64748B",
                fontSize: 14,
                lineHeight: 1.6
              }}
            >
              {desc}
            </p>
          </div>
        </div>

      </motion.div>
    ))}
  </div>
</section>




    {/* ================= ABOUT US ================= */}
<section id="about us"
  style={{
    maxWidth: 1100,
    margin: "140px auto",
    padding: "80px 40px",
    borderRadius: 28,
    background: "#FFFFFF",
    boxShadow: "0 20px 60px rgba(15,23,42,.05)",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: 34,
      marginBottom: 40,
      color: "#0F172A",
      fontWeight: 700,
    }}
  >
    About LDRP Institute of Technology & Research
  </h2>

  <p style={aboutPara}>
    LDRP Institute of Technology and Research, Gandhinagar was established in the academic year 2005–2006 and has steadily progressed as a leading institute of technical education in Gujarat. The institute offers undergraduate and postgraduate programs in Engineering, Management, and Computer Applications.
  </p>

  <p style={aboutPara}>
    The institute is recognized for imparting quality education, encouraging research-based learning, and fostering innovation among students. It plays a vital role in producing skilled professionals equipped to meet industry and societal demands.
  </p>

  <p style={aboutPara}>
    LDRP Institute of Technology and Research is a constituent institute of Kadi Sarva Vishwavidyalaya (KSV), a state university established by the Government of Gujarat under Act 21 of 2007 and approved by the University Grants Commission (UGC).
  </p>

  <div
    style={{
      marginTop: 50,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 30,
      textAlign: "center",
    }}
  >
    {[
      ["Established", "2005–2006"],
      ["Affiliated University", "Kadi Sarva Vishwavidyalaya"],
      ["Programs Offered", "B.E., M.B.A., M.C.A."],
    ].map(([title, value]) => (
      <div
        key={title}
        style={{
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: "26px 20px",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>
          {value}
        </div>
        <div style={{ marginTop: 6, color: "#64748B", fontSize: 14 }}>
          {title}
        </div>
      </div>
    ))}
  </div>
</section>


    {/* ================= PREMIUM FOOTER ================= */}
<footer id="contact"
  style={{
    background: "linear-gradient(180deg,#020617,#0F172A)",
    color: "#CBD5E1",
    padding: "90px 20px 40px",
    marginTop: 120,
    position: "relative",
  }}
>
  <div
    style={{
      maxWidth: 1200,
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: 60,
    }}
  >
    {/* BRAND */}
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <img src={logo} height="62" width="62"/>
        <span style={{ fontSize: 22 }}>
          <b style={{ color: "#5B2EFF" }}>College</b>
          <span style={{ color: "#fff" }}>ERP</span>
        </span>
        <span style={{ color: "#94A3B8", fontSize: 16 }}>@KSV</span>
      </div>

      <p style={{ maxWidth: 280, lineHeight: 1.7, color: "#94A3B8" }}>
        Inspiring students to innovate, collaborate and track academic excellence under KSV University.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h3 style={footTitle}>Quick Links</h3>
      {["Home","Features","User Roles","Rules","About Us","Contact"].map((l)=>(
        <p key={l} style={footLink}>{l}</p>
      ))}
    </div>

    {/* CONTACT */}
    <div>
      <h3 style={footTitle}>Contact Us</h3>
      <p>Gandhinagar, Gujarat</p>
      <p>KSV University</p>
      <p>info@collegeerp.in</p>
      <p>+91 79 0000 0000</p>
    </div>

    {/* FOLLOW */}
    <div>
      <h3 style={footTitle}>Follow Us</h3>
      <p style={footLink}>LinkedIn</p>
      <p style={footLink}>Instagram</p>
      <p style={footLink}>Twitter</p>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div
    style={{
      marginTop: 70,
      paddingTop: 22,
      borderTop: "1px solid rgba(255,255,255,.08)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: 1200,
      marginInline: "auto",
      color: "#94A3B8",
      fontSize: 14,
    }}
  >
    <span>© 2026 College ERP System • Affiliated to KSV University</span>
    <span style={{ color: "#FF8A3D" }}>Designed for Academic Excellence</span>
  </div>
</footer>

    </div>
  );
}
