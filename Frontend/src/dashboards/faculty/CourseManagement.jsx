import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, BookOpen } from "lucide-react";

const CourseManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    semester: "Spring 2026",
    department: "Computer Science",
    description: "",
  });

  // Initialize from localStorage or use default data
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("studentPortal_courses");
    if (savedCourses) {
      return JSON.parse(savedCourses);
    }
    return [
      {
        id: 1,
        code: "CS101",
        name: "Data Structures",
        credits: 4,
        semester: "Spring 2026",
        students: 45,
        status: "Active",
      },
      {
        id: 2,
        code: "CS201",
        name: "Algorithms",
        credits: 3,
        semester: "Spring 2026",
        students: 38,
        status: "Active",
      },
      {
        id: 3,
        code: "CS301",
        name: "Web Development",
        credits: 4,
        semester: "Spring 2026",
        students: 30,
        status: "Active",
      },
      {
        id: 4,
        code: "CS401",
        name: "Database Systems",
        credits: 3,
        semester: "Spring 2026",
        students: 42,
        status: "Active",
      },
    ];
  });

  // Save to localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem("studentPortal_courses", JSON.stringify(courses));
  }, [courses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code || !formData.name || !formData.credits) {
      alert("Please fill in all required fields");
      return;
    }

    const newCourse = {
      id: Date.now(),
      code: formData.code,
      name: formData.name,
      credits: parseInt(formData.credits),
      semester: formData.semester,
      students: 0,
      status: "Active",
    };

    setCourses([...courses, newCourse]);
    setFormData({
      code: "",
      name: "",
      credits: "",
      semester: "Spring 2026",
      department: "Computer Science",
      description: "",
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Course Management
          </h1>
          <p className="text-gray-600 mt-1">Manage courses and subjects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{course.code}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {course.name}
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Credits:</span>
                <span className="font-medium text-gray-800">
                  {course.credits}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Semester:</span>
                <span className="font-medium text-gray-800">
                  {course.semester}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Students Enrolled:</span>
                <span className="font-medium text-gray-800">
                  {course.students}
                </span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Course
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., CS101"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits *
                  </label>
                  <input
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 4"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Data Structures"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Course description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Spring 2026</option>
                  <option>Fall 2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                </select>
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
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
