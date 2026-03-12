import { useState, useEffect } from "react";
import { Search, Eye, Edit2, Mail } from "lucide-react";
import axios from "axios";

const StudentManagement = () => {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [division, setDivision] = useState("");

  const [loading, setLoading] = useState(true);

  /* ================= FETCH STUDENTS ================= */

  const fetchStudents = async () => {
    try {

      const res = await axios.get("/api/StudentCollections", {
        params: {
          semester,
          division,
          search
        }
      });

      const data = Array.isArray(res.data) ? res.data : res.data.students || [];

      setStudents(data);
      setFilteredStudents(data);

    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= LOCAL FILTER LOGIC ================= */


  useEffect(() => {

    let data = [...students];

    if (semester) {
      data = data.filter(
        (student) => student.semester === Number(semester)
      );
    }

    if (division) {
      data = data.filter(
        (student) => student.division === division
      );
    }

    if (search.trim() !== "") {

      const value = search.toLowerCase();

      data = data.filter((student) =>
        (student.name || "").toLowerCase().includes(value) ||
        (student.enrollment || "").toLowerCase().includes(value) ||
        (student.email || "").toLowerCase().includes(value)
      );
    }

    setFilteredStudents(data);

  }, [search, semester, division, students]);


  /* ================= RESET FILTER ================= */

  const resetFilters = () => {
    setSearch("");
    setSemester("");
    setDivision("");
    setFilteredStudents(students);
  };


  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Student Management
        </h1>

        <p className="text-gray-600 mt-1">
          View and manage student information
        </p>

      </div>


      {/* FILTER SECTION */}
     
      <div className="bg-white rounded-xl p-6 shadow-sm border">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SEARCH */}

          <div className="relative md:col-span-2">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search name, enrollment, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* SEMESTER FILTER */}

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >

            <option value="">All Semesters</option>

            {[1,2,3,4,5,6,7,8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}

          </select>


          {/* DIVISION FILTER */}

          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >

            <option value="">All Divisions</option>

            {["A","B","C","D","E","F","I","J","K","P","Q"].map((div) => (
              <option key={div} value={div}>
                Division {div}
              </option>
            ))}

          </select>

        </div>


        {/* RESET BUTTON */}

        <div className="mt-4">

          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Reset Filters
          </button>

        </div>

      </div>


      {/* STUDENT TABLE */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {loading ? (

          <div className="p-8 text-center text-gray-500">
            Loading students...
          </div>

        ) : filteredStudents.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No students found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Enrollment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Semester
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Division
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Batch
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {Array.isArray(filteredStudents) &&
                  filteredStudents.map((student, index) => (

                    <tr key={student._id || index} className="hover:bg-gray-50">

                      <td className="px-6 py-4 font-medium">
                        {student.enrollment}
                      </td>

                      <td className="px-6 py-4 flex items-center">

                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
                          alt={student.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />

                        <span className="font-medium">
                          {student.name}
                        </span>

                      </td>

                      <td className="px-6 py-4">
                        {student.email}
                      </td>

                      <td className="px-6 py-4">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4">
                        Sem {student.semester}
                      </td>

                      <td className="px-6 py-4">
                        {student.division}
                      </td>

                      <td className="px-6 py-4">
                        {student.batch || "-"}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex space-x-2">

                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye size={16}/>
                          </button>

                          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <Edit2 size={16}/>
                          </button>

                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                            <Mail size={16}/>
                          </button>

                        </div>

                      </td>

                    </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

};

export default StudentManagement;