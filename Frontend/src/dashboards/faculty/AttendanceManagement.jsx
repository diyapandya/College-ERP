import { useState, useEffect } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCourse, setSelectedCourse] = useState("Data Structures");

  // Initialize from localStorage or use default data
  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = localStorage.getItem("studentPortal_attendance");
    if (savedAttendance) {
      return JSON.parse(savedAttendance);
    }
    return [
      { id: 1, rollNo: "CS001", name: "John Doe", status: "present" },
      { id: 2, rollNo: "CS002", name: "Jane Smith", status: "present" },
      { id: 3, rollNo: "CS003", name: "Mike Johnson", status: "absent" },
      { id: 4, rollNo: "CS004", name: "Sarah Williams", status: "present" },
      { id: 5, rollNo: "CS005", name: "Tom Brown", status: "present" },
    ];
  });

  // Save to localStorage whenever attendance changes
  useEffect(() => {
    localStorage.setItem(
      "studentPortal_attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  const toggleAttendance = (id) => {
    setAttendance(
      attendance.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "present" ? "absent" : "present",
            }
          : student
      )
    );
  };

  const presentCount = attendance.filter((s) => s.status === "present").length;
  const absentCount = attendance.filter((s) => s.status === "absent").length;
  const attendancePercentage = (
    (presentCount / attendance.length) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance Management
        </h1>
        <p className="text-gray-600 mt-1">Mark and track student attendance</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option>Data Structures</option>
              <option>Algorithms</option>
              <option>Web Development</option>
              <option>Database Systems</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>CS-A</option>
              <option>CS-B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {attendance.length}
              </p>
            </div>
            <Calendar className="w-10 h-10 text-primary-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {presentCount}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {absentCount}
              </p>
            </div>
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Attendance %</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">
                {attendancePercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Mark Attendance
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedCourse} -{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                        alt={student.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status === "present" ? "✓ Present" : "✗ Absent"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        student.status === "present"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      Mark {student.status === "present" ? "Absent" : "Present"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
