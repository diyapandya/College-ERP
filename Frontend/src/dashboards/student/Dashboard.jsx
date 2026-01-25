import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "./DashboardCard";
import Timetable from "./Timetable";
import Assignments from "./Assignments";
import Notifications from "./Notifications";
import Results from "./Results";

import { BarChart3, Award, FileText, Calendar } from "lucide-react";

const Dashboard = () => {

  /* ================= STATE ================= */

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= STATS DATA ================= */

  const statsData = [
    {
      icon: BarChart3,
      title: "Attendance",
      value: "87.5%",
      subtitle: "35 of 40 classes",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: { type: "up", value: "+2.5%" },
    },
    {
      icon: Award,
      title: "CGPA",
      value: "8.7",
      subtitle: "Out of 10",
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: { type: "up", value: "+0.3" },
    },
    {
      icon: FileText,
      title: "Pending Assignments",
      value: "4",
      subtitle: "2 due this week",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Calendar,
      title: "Upcoming Exams",
      value: "3",
      subtitle: "Next: Data Structures",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {

    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/student/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(res.data);

      } catch (err) {

        console.log("Profile not found");
        setProfile(null);

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  /* ================= PROFILE NOT COMPLETED ================= */

 

  /* ================= DASHBOARD UI ================= */

  return (
    <div className="p-4 lg:p-6 space-y-6">

      {/* ================= WELCOME ================= */}

      <div className="bg-white border-l-4 border-primary-600 rounded-lg p-6 shadow-sm">

        <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">
          Welcome back, {profile.name}
        </h1>

        <p className="text-gray-600">
          Here's an overview of your academic progress and upcoming activities.
        </p>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

        {statsData.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
        <div className="lg:col-span-2 space-y-6">

          <Timetable />
          <Assignments />

        </div>

        {/* Right */}
        <div className="space-y-6">

          <Notifications />
          <Results />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
