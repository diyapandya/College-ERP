import Sidebar from "../components/Sidebar"

export default function StudentLayout({children}){
  return(
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 bg-slate-100 min-h-screen p-6">{children}</div>
    </div>
  )
}
