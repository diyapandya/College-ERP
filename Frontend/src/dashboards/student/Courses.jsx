import { useEffect, useState } from "react"
import { BookOpen, CheckCircle } from "lucide-react"

const Courses = () => {
  // Load from localStorage (shared demo data for now)
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("studentPortal_courses")
    if (saved) return JSON.parse(saved)

    return [
      {
        id: 1,
        code: "CS101",
        name: "Data Structures",
        credits: 4,
        semester: "Spring 2026",
        faculty: "Dr. A. Sharma",
        status: "Enrolled"
      },
      {
        id: 2,
        code: "CS201",
        name: "Algorithms",
        credits: 3,
        semester: "Spring 2026",
        faculty: "Prof. R. Mehta",
        status: "Enrolled"
      },
      {
        id: 3,
        code: "CS301",
        name: "Web Development",
        credits: 4,
        semester: "Spring 2026",
        faculty: "Ms. K. Patel",
        status: "Enrolled"
      }
    ]
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        <p className="text-gray-600 mt-1">
          Courses you are currently enrolled in
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {course.code}
                  </h3>
                  <span className="flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded mt-1 w-fit">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {course.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Name */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {course.name}
            </h2>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Credits</span>
                <span className="font-medium text-gray-800">
                  {course.credits}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Semester</span>
                <span className="font-medium text-gray-800">
                  {course.semester}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Faculty</span>
                <span className="font-medium text-gray-800">
                  {course.faculty}
                </span>
              </div>
            </div>

            {/* Action */}
            <button className="w-full mt-4 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium">
              View Course Details
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No courses enrolled yet.
        </div>
      )}
    </div>
  )
}

export default Courses
