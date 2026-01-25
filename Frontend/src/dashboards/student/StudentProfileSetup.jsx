import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* =====================================================
   STUDENT PROFILE SETUP (FINAL VERSION)
===================================================== */

const StudentProfileSetup = () => {
  const { refreshUser } = useAuth();
const navigate = useNavigate();

  /* ---------------- FORM STATE (ORDERED) ---------------- */
  const [form, setForm] = useState({
    name: "",
    enrollment: "",
    branch: "",
    semester: "",
    division: "",
    phone: "",
    email: "",
    aadhaarMasked: "",
    bloodGroup: "",
    address: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    abcId: ""
  });

  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /* ---------------- AUTO LOAD PROFILE ---------------- */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student/profile",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data) {
        setForm(res.data);
        setSaved(true);
      }
    } catch {
      console.log("No saved profile");
    }
  };

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    /*
    for (let key in form) {
      if (!form[key]) {
        toast.error("All fields are mandatory");
        return false;
      }
    }
      */

    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Phone must be 10 digits");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!/^\d+$/.test(form.semester)) {
      toast.error("Semester must be a number");
      return false;
    }

    if (!/^\d{4}-\d{4}$/.test(form.aadhaarMasked)) {
      toast.error("Aadhaar format: 1234-5678");
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/student/profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Profile saved successfully");

      setSaved(true);
      setIsEditing(false);

      await refreshUser();
      navigate("/student");
    } catch {
      toast.error("Profile save failed");
    }
  };

  /* ---------------- EDIT MODE ---------------- */
  const handleEdit = () => {
    setIsEditing(true);
    setSaved(false);
  };

  /* ---------------- LABEL FORMATTER ---------------- */
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());
  };

  /* ================= UI ================= */

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Student Profile Setup
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* ================= FORM FIELDS ================= */}
        {Object.keys(form).map((key) => {

          const lockedFields = [
          ];

          const locked =
            saved && !isEditing && lockedFields.includes(key);

          return key !== "address" ? (

            <div key={key} className="flex flex-col gap-1">

              {/* Label */}
              <label className="text-sm font-semibold text-gray-700">
                {formatLabel(key)}
              </label>

              {/* Input */}
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                disabled={locked}
                className={`border rounded-lg px-4 py-2 outline-none
                  focus:ring-2 focus:ring-indigo-400
                  ${locked ? "bg-gray-100 cursor-not-allowed" : ""}
                `}
              />

            </div>

          ) : (

            <div key={key} className="flex flex-col gap-1 md:col-span-2">

              <label className="text-sm font-semibold text-gray-700">
                Address
              </label>

              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows="3"
                className="border rounded-lg px-4 py-2 outline-none
                           focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          );
        })}

        {/* ================= BUTTONS ================= */}
        <div className="col-span-2 flex justify-between mt-6">

          {/* EDIT */}
          <button
            type="button"
            onClick={handleEdit}
            disabled={!saved}
            style={btnStyle("#5B2EFF")}
          >
            Edit
          </button>

          {/* SAVE */}
          <button
            type="submit"
            style={btnStyle("#FF8A3D")}
          >
            Save Profile
          </button>

        </div>

      </form>

      {!saved && (
        <p className="text-center text-red-500 mt-4 text-sm">
          ⚠ Please save your profile to access dashboard
        </p>
      )}

    </motion.div>
  );
};

/* ---------------- BUTTON STYLE ---------------- */

const btnStyle = (color) => ({
  padding: "10px 28px",
  borderRadius: "22px",
  background: "#FFFFFF",
  color: color,
  border: "2px solid transparent",
  fontSize: "16px",
  cursor: "pointer",
  backgroundImage: `
    linear-gradient(#fff,#fff),
    linear-gradient(135deg,#5B2EFF,#CB3CFF,#FF8A3D)
  `,
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  boxShadow: "0 0 10px rgba(203,60,255,0.4)",
  transition: "0.3s"
});

export default StudentProfileSetup;
