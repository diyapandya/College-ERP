import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Award,
  Bell,
  BookOpen,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
  { path: "/faculty", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/faculty/timetable", icon: Calendar, label: "Timetable" },
  { path: "/faculty/assignments", icon: FileText, label: "Assignments" },
  { path: "/faculty/results", icon: Award, label: "Results" },
  { path: "/faculty/attendance", icon: CheckSquare, label: "Attendance" },
  { path: "/faculty/notifications", icon: Bell, label: "Notifications" },
  { path: "/faculty/courses", icon: BookOpen, label: "Courses" },
  { path: "/faculty/students", icon: Users, label: "Students" },
  { path: "/faculty/reports", icon: BarChart3, label: "Reports" },
  { path: "/faculty/settings", icon: Settings, label: "Settings" },
];


  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Faculty Portal</h1>
            <p className="text-xs text-gray-500">College ERP</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
