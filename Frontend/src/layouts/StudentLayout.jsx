import { Outlet } from "react-router-dom"
import { useState } from "react"

import Sidebar from "../components/studentdashboard/Sidebar"
import Header from "../components/studentdashboard/Header"

const StudentLayout = () => {

  const [expanded, setExpanded] = useState(false)

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">

      {/* Sidebar */}
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
      />

      {/* Main Wrapper */}
      <div
        className="flex flex-col h-full transition-all duration-300"
        style={{
          marginLeft: expanded ? "210px" : "70px"
        }}
      >

        {/* Header */}
        <Header expanded={expanded} />

        {/* Main Content */}
        <main className="flex-1  overflow-y-auto pt-16"
        style={{
            marginTop: "64px",        // push below fixed header
            height: "calc(100vh - 64px)",
             paddingLeft: expanded ? "24px" : "16px",
            background:
      "linear-gradient(135deg, rgba(91,46,255,.08), rgba(203,60,255,.08), rgba(255,138,61,.08))"
          }}>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default StudentLayout
