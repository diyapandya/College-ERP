import { Home, BookOpen, Award, AlertTriangle, File } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sidebar(){
  return(
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">LDRP ERP</h2>
      <Link className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded" to="/student">Dashboard</Link>
      <Link className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded" to="/student/attendance">Attendance</Link>
      <Link className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded" to="/student/marks">Marks</Link>
      <Link className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded" to="/student/eligibility">Eligibility</Link>
      <Link className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded" to="/student/certificates">Certificates</Link>
    </div>
  )
}
