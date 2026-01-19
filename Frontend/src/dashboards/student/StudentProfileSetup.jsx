import { useState } from "react"
import axios from "axios"
import {useAuth} from "../../context/AuthContext"


const StudentProfileSetup = () => {

  const { refreshUser } = useAuth()
  const [form, setForm] = useState({
    name: "",
    branch: "",
    semester: "",
    division: "",
    enrollment: "",
    abcId: "",
    aadhaarMasked: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    parentName: "",
    parentPhone: "",
    parentEmail: ""
  })

  const [profile, setProfile] = useState(null)
  const [saved, setSaved] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      if (!token) return alert("Login required")

      const res = await axios.post(
        "http://localhost:5000/api/student/profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setProfile(res.data)
      setSaved(true)
      setIsEditing(false)
      await refreshUser()
    } catch (err) {
      alert(err.response?.data || "Profile save failed")
    }
  }



  const handleEdit = () => {
    setForm(profile)       // ✅ auto-fill form
    setIsEditing(true)
    setSaved(false)
  }

  /* ================= PROFILE VIEW ================= */
  if (saved && profile && !isEditing) {
    return (
      <div style={styles.container}>
        <h2>My Profile</h2>

        <div style={styles.card}>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Branch:</b> {profile.branch}</p>
          <p><b>Semester:</b> {profile.semester}</p>
          <p><b>Division:</b> {profile.division}</p>
          <p><b>Enrollment:</b> {profile.enrollment}</p>
          <p><b>ABC ID:</b> {profile.abcId}</p>
          <p><b>Aadhaar:</b> {profile.aadhaarMasked}</p>
          <p><b>Blood Group:</b> {profile.bloodGroup}</p>
          <p><b>Phone:</b> {profile.phone}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Address:</b> {profile.address}</p>

          <hr />

          <p><b>Parent Name:</b> {profile.parentName}</p>
          <p><b>Parent Phone:</b> {profile.parentPhone}</p>
          <p><b>Parent Email:</b> {profile.parentEmail}</p>

          <button onClick={handleEdit} style={styles.editBtn}>
            Edit Profile
          </button>
        </div>
      </div>
    )
  }

  /* ================= PROFILE FORM ================= */
  return (
    <div style={styles.container}>
      <h2>{isEditing ? "Edit Profile" : "Student Profile Setup"}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />

        <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" required />
        <input
          name="semester"
          type="number"
          value={form.semester}
          onChange={handleChange}
          placeholder="Semester"
          required
        />
        <input name="division" value={form.division} onChange={handleChange} placeholder="Division" required />

        <input name="enrollment" value={form.enrollment} onChange={handleChange} placeholder="Enrollment No" />
        <input name="abcId" value={form.abcId} onChange={handleChange} placeholder="ABC ID" />
        <input name="aadhaarMasked" value={form.aadhaarMasked} onChange={handleChange} placeholder="Aadhaar (XXXX-XXXX)" />
        <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="Blood Group" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" />

        <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent Name" />
        <input name="parentPhone" value={form.parentPhone} onChange={handleChange} placeholder="Parent Phone" />
        <input name="parentEmail" value={form.parentEmail} onChange={handleChange} placeholder="Parent Email" />

        <button type="submit">
          {isEditing ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    lineHeight: "1.8"
  },
  editBtn: {
    marginTop: "20px",
    padding: "8px 14px",
    cursor: "pointer"
  }
}

export default StudentProfileSetup
