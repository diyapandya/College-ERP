import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

const AttendanceManagement = () => {
  const location = useLocation();
  const lecture = location.state;

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    if (!lecture) return;
    fetchStudents();
  }, [lecture]);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
       const query = new URLSearchParams({
      semester: lecture.semester,
      division: lecture.division,
      ...(lecture.batch && { batch: lecture.batch })
    }).toString();

      const res = await fetch(
  `http://localhost:5000/api/faculty/students?${query}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

      const data = await res.json();

      const formatted = data.map((student) => ({
        id: student._id,
        rollNo: student.enrollment,
        name: student.name,
        status: "present",
      }));

      setAttendance(formatted);
      setLoading(false);

    } catch (err) {
      console.error("Error fetching students:", err);
      setLoading(false);
    }
  };

  /* ================= TOGGLE ATTENDANCE ================= */
  const toggleAttendance = (id) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "present" ? "absent" : "present",
            }
          : student
      )
    );
  };

  /* ================= SAVE ATTENDANCE ================= */
  const saveAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: lecture.subject,
          semester: lecture.semester,
          division: lecture.division,
          date: selectedDate,
          records: attendance.map((s) => ({
            studentId: s.id,
            status: s.status,
          })),
        }),
      });

      alert("Attendance Saved Successfully");
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save attendance");
    }
  };

  /* ================= STATISTICS ================= */
  const presentCount = attendance.filter(
    (s) => s.status === "present"
  ).length;

  const absentCount = attendance.filter(
    (s) => s.status === "absent"
  ).length;

  const attendancePercentage = attendance.length
    ? ((presentCount / attendance.length) * 100).toFixed(1)
    : 0;

  if (!lecture) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          No lecture selected.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance Management
        </h1>
        <p className="text-gray-600 mt-1">
          {lecture.subject} | Sem {lecture.semester} - Division{" "}
          {lecture.division}
        </p>
      </div>

      {/* DATE SELECTOR */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={attendance.length} icon={<Calendar />} />
        <StatCard title="Present" value={presentCount} icon={<CheckCircle />} green />
        <StatCard title="Absent" value={absentCount} icon={<XCircle />} red />
        <StatCard title="Attendance %" value={`${attendancePercentage}%`} />
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Mark Attendance</h2>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading students...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium">
                    Roll No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {attendance.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 font-medium">
                      {student.rollNo}
                    </td>

                    <td className="px-6 py-4">{student.name}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status === "present"
                          ? "Present"
                          : "Absent"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`px-4 py-2 rounded-lg ${
                          student.status === "present"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        Mark{" "}
                        {student.status === "present"
                          ? "Absent"
                          : "Present"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-6 border-t bg-gray-50 text-right">
          <button
            onClick={saveAttendance}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= STAT CARD COMPONENT ================= */

const StatCard = ({ title, value, icon, green, red }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p
            className={`text-3xl font-bold mt-2 ${
              green
                ? "text-green-600"
                : red
                ? "text-red-600"
                : "text-primary-600"
            }`}
          >
            {value}
          </p>
        </div>
        {icon && (
          <div
            className={`w-10 h-10 ${
              green
                ? "text-green-600"
                : red
                ? "text-red-600"
                : "text-primary-600"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
