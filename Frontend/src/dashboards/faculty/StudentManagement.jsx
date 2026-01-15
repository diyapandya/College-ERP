import { useState } from "react";
import { Search, Eye, Edit2, Mail } from "lucide-react";

const StudentManagement = () => {
  const [students] = useState([
    {
      id: 1,
      rollNo: "CS001",
      name: "John Doe",
      email: "john.doe@college.edu",
      phone: "+1234567890",
      section: "CS-A",
      attendance: 85,
    },
    {
      id: 2,
      rollNo: "CS002",
      name: "Jane Smith",
      email: "jane.smith@college.edu",
      phone: "+1234567891",
      section: "CS-A",
      attendance: 92,
    },
    {
      id: 3,
      rollNo: "CS003",
      name: "Mike Johnson",
      email: "mike.j@college.edu",
      phone: "+1234567892",
      section: "CS-B",
      attendance: 78,
    },
    {
      id: 4,
      rollNo: "CS004",
      name: "Sarah Williams",
      email: "sarah.w@college.edu",
      phone: "+1234567893",
      section: "CS-B",
      attendance: 88,
    },
    {
      id: 5,
      rollNo: "CS005",
      name: "Tom Brown",
      email: "tom.b@college.edu",
      phone: "+1234567894",
      section: "CS-A",
      attendance: 90,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <p className="text-gray-600 mt-1">
          View and manage student information
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, roll number, or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Sections</option>
              <option>CS-A</option>
              <option>CS-B</option>
            </select>
          </div>
          <div>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Courses</option>
              <option>Data Structures</option>
              <option>Algorithms</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
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
                      <span className="text-gray-800 font-medium">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {student.section}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={`font-medium ${
                          student.attendance >= 85
                            ? "text-green-600"
                            : student.attendance >= 75
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {student.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
