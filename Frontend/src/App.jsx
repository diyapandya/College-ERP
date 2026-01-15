import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Landingpage from "./pages/Landing";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ProtectedRoute from "./auth/ProtectedRoute";

// Dashboards
import StudentDashboard from "./dashboards/student/StudentDashboard";
import ParentDashboard from "./dashboards/parent/ParentDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";

// Faculty Layout + Pages
import FacultyLayout from "./layouts/FacultyLayout";
import Dashboard from "./dashboards/faculty/Dashboard";
import TimetableManagement from "./dashboards/faculty/TimetableManagement";
import AssignmentManagement from "./dashboards/faculty/AssignmentManagement";
import ResultsManagement from "./dashboards/faculty/ResultsManagement";
import NotificationsManagement from "./dashboards/faculty/NotificationsManagement";
import CourseManagement from "./dashboards/faculty/CourseManagement";
import StudentManagement from "./dashboards/faculty/StudentManagement";
import AttendanceManagement from "./dashboards/faculty/AttendanceManagement";
import Reports from "./dashboards/faculty/Reports";
import Settings from "./dashboards/faculty/Settings";

// Parent/Admin Extras
import ParentMessages from "./dashboards/parent/Messages";
import Seeder from "./dashboards/admin/Seeder";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup />} />

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Parent */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute role="parent">
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/messages"
        element={
          <ProtectedRoute role="parent">
            <ParentMessages />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/seeder"
        element={
          <ProtectedRoute role="admin">
            <Seeder />
          </ProtectedRoute>
        }
      />

      {/* Faculty Layout */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <FacultyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="timetable" element={<TimetableManagement />} />
        <Route path="assignments" element={<AssignmentManagement />} />
        <Route path="results" element={<ResultsManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
