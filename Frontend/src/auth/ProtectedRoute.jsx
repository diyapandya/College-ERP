import { Navigate,useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({children,role}){
  const { user } = useAuth()
  const location = useLocation()
 if (!user) return <Navigate to="/login" />;{
   if (role && user.role !== role) return <Navigate to="/login" />;

 }

if (
    user.role === "student" &&
    !user.linkedStudentId &&
    location.pathname !== "/student/profile-setup"
  ) {
    return <Navigate to="/student/profile-setup" />
  }

  return children
}
