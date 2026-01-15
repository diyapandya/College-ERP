import { useState, useEffect } from "react";
import { Plus, Edit2, Download, Upload } from "lucide-react";

const ResultsManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    rollNo: "",
    course: "Data Structures",
    exam: "Midterm",
    marks: "",
    total: "100",
  });

  // Initialize from localStorage or use default data
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem("studentPortal_results");
    if (savedResults) {
      return JSON.parse(savedResults);
    }
    return [
      {
        id: 1,
        student: "John Doe",
        rollNo: "CS001",
        exam: "Midterm",
        course: "Data Structures",
        marks: 85,
        total: 100,
        grade: "A",
      },
      {
        id: 2,
        student: "Jane Smith",
        rollNo: "CS002",
        exam: "Midterm",
        course: "Data Structures",
        marks: 92,
        total: 100,
        grade: "A+",
      },
      {
        id: 3,
        student: "Mike Johnson",
        rollNo: "CS003",
        exam: "Midterm",
        course: "Algorithms",
        marks: 78,
        total: 100,
        grade: "B+",
      },
      {
        id: 4,
        student: "Sarah Williams",
        rollNo: "CS004",
        exam: "Midterm",
        course: "Web Development",
        marks: 88,
        total: 100,
        grade: "A",
      },
    ];
  });

  // Save to localStorage whenever results change
  useEffect(() => {
    localStorage.setItem("studentPortal_results", JSON.stringify(results));
  }, [results]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateGrade = (marks, total) => {
    const percentage = (marks / total) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.student ||
      !formData.rollNo ||
      !formData.marks ||
      !formData.total
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const marksNum = parseInt(formData.marks);
    const totalNum = parseInt(formData.total);

    const newResult = {
      id: Date.now(),
      student: formData.student,
      rollNo: formData.rollNo,
      exam: formData.exam,
      course: formData.course,
      marks: marksNum,
      total: totalNum,
      grade: calculateGrade(marksNum, totalNum),
    };

    setResults([...results, newResult]);
    setFormData({
      student: "",
      rollNo: "",
      course: "Data Structures",
      exam: "Midterm",
      marks: "",
      total: "100",
    });
    setShowModal(false);
  };

  const getGradeColor = (grade) => {
    const colors = {
      "A+": "bg-green-100 text-green-700",
      A: "bg-green-100 text-green-700",
      "B+": "bg-blue-100 text-blue-700",
      B: "bg-blue-100 text-blue-700",
      C: "bg-yellow-100 text-yellow-700",
      D: "bg-orange-100 text-orange-700",
      F: "bg-red-100 text-red-700",
    };
    return colors[grade] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Results Management
          </h1>
          <p className="text-gray-600 mt-1">
            Add and manage student examination results
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Import Results</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Result</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Courses</option>
              <option>Data Structures</option>
              <option>Algorithms</option>
              <option>Web Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Exams</option>
              <option>Midterm</option>
              <option>Final</option>
              <option>Quiz</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Spring 2026</option>
              <option>Fall 2025</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Results
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Results</span>
          </button>
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
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {result.rollNo}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{result.student}</td>
                  <td className="px-6 py-4 text-gray-600">{result.course}</td>
                  <td className="px-6 py-4 text-gray-600">{result.exam}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-800 font-semibold">
                      {result.marks}/{result.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(
                        result.grade
                      )}`}
                    >
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Result Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Student Result
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="student"
                  value={formData.student}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., CS001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option>Data Structures</option>
                  <option>Algorithms</option>
                  <option>Web Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Type *
                </label>
                <select
                  name="exam"
                  value={formData.exam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option>Midterm</option>
                  <option>Final</option>
                  <option>Quiz</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks Obtained *
                  </label>
                  <input
                    type="number"
                    name="marks"
                    value={formData.marks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="85"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsManagement;
