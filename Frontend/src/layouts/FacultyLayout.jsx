import { Outlet } from "react-router-dom";
import Sidebar from "../components/facultydashboard/Sidebar";
import Header from "../components/facultydashboard/Header";

const FacultyLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
