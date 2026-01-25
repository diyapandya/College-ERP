import {
  LayoutDashboard,
  Calendar,
  FileText,
  Award,
  Bell,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

/* =====================================================
   HOTSTAR STYLE FACULTY SIDEBAR
===================================================== */

const Sidebar = ({ expanded, setExpanded }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();


  /* Menu */
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/faculty" },
    { icon: Calendar, label: "Timetable", path: "/faculty/timetable" },
    { icon: FileText, label: "Assignments", path: "/faculty/assignments" },
    { icon: Award, label: "Results", path: "/faculty/results" },
    { icon: Bell, label: "Notifications", path: "/faculty/notifications" },
    { icon: BookOpen, label: "Courses", path: "/faculty/courses" },
    { icon: Users, label: "Students", path: "/faculty/students" },
    { icon: BarChart3, label: "Reports", path: "/faculty/reports" },
    { icon: Settings, label: "Settings", path: "/faculty/settings" }
  ];


  /* Logout */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <motion.aside

      /* Width animation */
      animate={{
        width: expanded ? 210 : 70
      }}

      transition={{ duration: 0.3 }}

      /* Hover Expand */
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}

      className="fixed top-0 left-0 h-screen z-40 flex flex-col"

      style={{

        /* Glass Background */
        background: "#0f172a",

        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",

        borderRight: "1px solid rgba(255,255,255,0.08)",

        boxShadow: "6px 0 30px rgba(0,0,0,.4)"
      }}
    >

      {/* ================= LOGO ================= */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <span className="text-white font-bold text-xl">
          🎓
        </span>
      </div>


      {/* ================= MENU ================= */}
      <nav className="flex-1 px-2 py-4 space-y-1">

        {menuItems.map((item, i) => {

          const isActive = location.pathname === item.path;

          return (

            <motion.button
              key={i}

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

              onClick={() => navigate(item.path)}

              className={`w-full flex items-center gap-3
                px-3 py-3 rounded-xl
                transition-all duration-300
                ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                }
              `}

              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(91,46,255,.08), rgba(203,60,255,.08), rgba(255,138,61,.08))"
                    }
                  : {}
              }
            >

              {/* ICON */}
              <item.icon size={20} />

              {/* LABEL */}
              {expanded && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}

            </motion.button>

          );
        })}

      </nav>


      {/* ================= LOGOUT ================= */}
      <div className="p-2 border-t border-white/10">

        <motion.button

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

          onClick={handleLogout}

          className="w-full flex items-center gap-3
                     px-3 py-3 rounded-xl
                     text-red-300 hover:text-white
                     hover:bg-red-500/20
                     transition-all"
        >

          <LogOut size={22} />

          {expanded && (
            <span className="text-sm font-medium">
              Logout
            </span>
          )}

        </motion.button>

      </div>

    </motion.aside>
  );
};

export default Sidebar;
