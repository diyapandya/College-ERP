import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const AttendanceManagement = () => {

  const location = useLocation();
  const lecture = location.state;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (lecture) {
      generateStudents();
    }
  }, [lecture]);

  /* ================= GENERATE STUDENTS ================= */

  const generateStudents = () => {

    const totalStudents = lecture.batch ? 25 : 75;

    const generated = [];

    for (let i = 1; i <= totalStudents; i++) {
      generated.push({
        id: i,
        enrollmentNo: `23BECE30${String(i).padStart(3, "0")}`,
        name: `Student ${i}`,
        status: "present"
      });
    }

    setStudents(generated);
  };

  /* ================= TOGGLE ================= */

  const toggleAttendance = (id) => {
    setStudents(prev =>
      prev.map(stu =>
        stu.id === id
          ? {
              ...stu,
              status: stu.status === "present" ? "absent" : "present"
            }
          : stu
      )
    );
  };

  const presentCount = students.filter(s => s.status === "present").length;
  const absentStudents = students.filter(s => s.status === "absent");

  if (!lecture) {
    return <div className="p-6">No Lecture Selected</div>;
  }

  return (
    <div className="space-y-6 p-6">

      <h1 className="text-2xl font-bold">
        {lecture.subject} - Sem {lecture.semester} {lecture.division}
        {lecture.batch && ` - Batch ${lecture.batch}`}
      </h1>

      {/* Stats */}
      <div className="bg-white p-4 rounded shadow flex justify-between">
        <p>Total Students: {students.length}</p>
        <p>Present: {presentCount}</p>
        <p>Absent: {absentStudents.length}</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left">Enrollment</th>
              <th className="px-6 py-3 text-left">Student Full Name</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  {student.enrollmentNo}
                </td>

                <td className="px-6 py-4">
                  {student.name}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {student.status === "present" ? "Present" : "Absent"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      student.status === "present"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
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

      {/* Absent List */}
      {absentStudents.length > 0 && (
        <div className="bg-red-50 p-4 rounded shadow">
          <h3 className="font-semibold text-red-600 mb-2">
            Absent Students ({absentStudents.length})
          </h3>

          {absentStudents.map(stu => (
            <p key={stu.id}>
              {stu.enrollmentNo} - {stu.name}
            </p>
          ))}

          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
            Send Homework to Absent Students
          </button>
        </div>
      )}

    </div>
  );
};

export default AttendanceManagement;
