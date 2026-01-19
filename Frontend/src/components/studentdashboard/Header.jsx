import { useState, useEffect } from "react"
import { Menu, Bell, X } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profile, setProfile] = useState(null)
  const [notifications, setNotifications] = useState([])

  /* 👤 Initials from logged-in user */
  const initials = user?.name
    ? user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "ST"

  /* 📥 Fetch student profile */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await axios.get(
          "http://localhost:5000/api/student/profile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setProfile(res.data)
      } catch (err) {
        console.error("Profile not loaded")
      }
    }

    fetchProfile()
  }, [])

  /* 🔔 Fetch notifications */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await axios.get(
          "http://localhost:5000/api/notifications/my",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        setNotifications(res.data)
      } catch (err) {
        console.error("Notifications not loaded")
      }
    }

    fetchNotifications()
  }, [])

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 lg:ml-64">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">

          {/* LEFT */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              Student Dashboard
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center space-x-4 relative">

            {/* 🔔 Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-16 top-14 w-72 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-3 font-semibold border-b">
                  Notifications
                </div>

                {notifications.length === 0 && (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications
                  </div>
                )}

                {notifications.map(n => (
                  <div
                    key={n._id}
                    className="px-4 py-2 text-sm hover:bg-gray-50 border-b last:border-b-0"
                  >
                    {n.title}
                  </div>
                ))}
              </div>
            )}

            {/* 👤 Profile Avatar */}
            <div
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
            >
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* ================= PROFILE MODAL ================= */}
      {showProfile && profile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">

            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">My Profile</h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Branch:</b> {profile.branch}</p>
              <p><b>Semester:</b> {profile.semester}</p>
              <p><b>Division:</b> {profile.division}</p>
              <p><b>Enrollment:</b> {profile.enrollment}</p>
              <p><b>ABC ID:</b> {profile.abcId}</p>
              <p><b>Blood Group:</b> {profile.bloodGroup}</p>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Address:</b> {profile.address}</p>

              <hr />

              <p><b>Parent Name:</b> {profile.parentName}</p>
              <p><b>Parent Phone:</b> {profile.parentPhone}</p>
              <p><b>Parent Email:</b> {profile.parentEmail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
