import { Outlet } from "react-router-dom";
import Sidebar from "../components/studentdashboard/Sidebar";
import Header from "../components/studentdashboard/Header";
import { useState } from "react";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
