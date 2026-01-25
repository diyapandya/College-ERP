import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

/* =====================================================
   FACULTY DASHBOARD HEADER (STUDENT STYLE)
===================================================== */

const Header = ({ expanded }) => {

  const { user } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);


  /* 👤 Initials */
  const initials = user?.name
    ? user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "FC";


  /* 📥 Fetch Faculty Profile */
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/faculty/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(res.data);

      } catch {
        console.error("Faculty profile not loaded");
      }
    };

    fetchProfile();

  }, [user]);


  /* 🔔 Fetch Notifications */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/notifications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setNotifications(res.data);

      } catch {
        console.error("Notifications not loaded");
      }
    };

    fetchNotifications();

  }, []);


  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="
          fixed
          top-0
          right-0
          h-16
          bg-[#0f172a]
          transition-all
          duration-300
          flex
          items-center
          z-30
        "
        style={{
          left: expanded ? "210px" : "70px"
        }}
      >
        <div className="flex items-center justify-between h-full px-6 w-full">

          {/* LEFT */}
          <div className="flex items-center">

            <h1 className="text-lg font-bold text-white">
              Faculty Dashboard
            </h1>

          </div>


          {/* RIGHT */}
          <div className="flex items-center space-x-4 relative">

            {/* 🔔 Notifications */}
            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="
                relative
                p-2
                text-white/80
                hover:text-white
                hover:bg-white/10
                rounded-lg
                transition
              "
            >
              <Bell size={22} />

              {notifications.length > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-red-500
                    text-white
                    text-xs
                    px-1.5
                    rounded-full
                  "
                >
                  {notifications.length}
                </span>
              )}
            </button>


            {/* NOTIFICATION DROPDOWN */}
            {showNotifications && (
              <div
                className="
                  absolute
                  right-16
                  top-14
                  w-72
                  bg-white
                  border
                  rounded-lg
                  shadow-lg
                  z-50
                "
              >
                <div className="p-3 font-semibold border-b">
                  Notifications
                </div>

                {notifications.length === 0 && (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications
                  </div>
                )}

                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className="
                      px-4
                      py-2
                      text-sm
                      hover:bg-gray-50
                      border-b
                      last:border-b-0
                    "
                  >
                    {n.title}
                  </div>
                ))}
              </div>
            )}


            {/* 👤 AVATAR */}
            <div
              onClick={() => setShowProfile(true)}
              className="
                w-10
                h-10
                bg-primary-600
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-semibold
                cursor-pointer
              "
            >
              {initials}
            </div>

          </div>
        </div>
      </header>


      {/* ================= PROFILE MODAL ================= */}
      {showProfile && profile && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
          "
        >
          <div
            className="
              bg-white
              rounded-lg
              w-full
              max-w-md
              p-6
              relative
            "
          >

            {/* CLOSE */}
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X size={20} />
            </button>


            <h2 className="text-xl font-bold mb-4">
              My Profile
            </h2>


            <div className="space-y-2 text-sm text-gray-700">

              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Department:</b> {profile.department}</p>
              <p><b>Designation:</b> {profile.designation}</p>

              <hr />

              <p><b>Faculty ID:</b> {profile.facultyId}</p>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
