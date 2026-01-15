import { Link } from "react-router-dom"

export default function AdminLayout({children}){
  return(
    <div className="flex">
      <div className="w-64 bg-slate-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <Link to="/admin" className="block p-2 hover:bg-slate-700 rounded">Dashboard</Link>
        <Link to="/admin/seeder" className="block p-2 hover:bg-slate-700 rounded">Seed Students</Link>
      </div>
      <div className="flex-1 bg-slate-100 min-h-screen p-6">{children}</div>
    </div>
  )
}
