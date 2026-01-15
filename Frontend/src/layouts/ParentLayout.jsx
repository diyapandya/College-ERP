import { Link } from "react-router-dom"

export default function ParentLayout({children}){
  return(
    <div className="flex">
      <div className="w-64 bg-emerald-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Parent Panel</h2>
        <Link to="/parent" className="block p-2 hover:bg-emerald-800 rounded">Dashboard</Link>
        <Link to="/parent/messages" className="block p-2 hover:bg-emerald-800 rounded">Messages</Link>
      </div>
      <div className="flex-1 bg-slate-100 min-h-screen p-6">{children}</div>
    </div>
  )
}
