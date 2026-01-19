import { useEffect, useState } from "react"
import { TrendingUp, Award } from "lucide-react"
import api from "../../api/axios"

const Results = () => {
  const [eligibility, setEligibility] = useState([])

  /* ---------------- FETCH ELIGIBILITY ---------------- */
  useEffect(() => {
    api.get("/student/eligibility")
      .then(res => setEligibility(res.data))
      .catch(() => setEligibility([]))
  }, [])

  /* ---------------- STATIC RESULT UI (TEMP / DEMO) ---------------- */
  const results = [
    {
      semester: "Semester 5",
      sgpa: "8.9",
      status: "Current",
      subjects: [
        { name: "Data Structures", grade: "A+", credits: 4 },
        { name: "Database Management", grade: "A", credits: 4 },
        { name: "Computer Networks", grade: "A+", credits: 3 },
        { name: "Operating Systems", grade: "A", credits: 4 },
      ],
    },
    {
      semester: "Semester 4",
      sgpa: "8.7",
      status: "Completed",
      subjects: [],
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">

      {/* ================= ACADEMIC RESULTS ================= */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Academic Results</h2>
        </div>

        {/* CGPA CARD */}
        <div className="bg-primary-600 rounded-lg p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-100 mb-1">Overall CGPA</p>
              <p className="text-3xl font-bold">8.7</p>
            </div>
            <Award size={40} className="opacity-30" />
          </div>
          <div className="flex items-center mt-3 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>+0.3 from last semester</span>
          </div>
        </div>

        {/* SEMESTER RESULTS */}
        <div className="space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === "Current"
                  ? "border-primary-200 bg-primary-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {result.semester}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">SGPA</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {result.sgpa}
                  </p>
                </div>
              </div>

              {result.subjects.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                  {result.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {subject.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                          {subject.credits} Cr
                        </span>
                        <span
                          className={`px-2 py-1 rounded font-semibold ${
                            subject.grade.includes("+")
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {subject.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= KSV EXAM ELIGIBILITY ================= */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          KSV Exam Eligibility
        </h2>

        <div className="space-y-3">
          {eligibility.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <span className="font-medium text-gray-800">
                {item.subject}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.eligibilityStatus === "Eligible"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.eligibilityStatus}
              </span>
            </div>
          ))}

          {eligibility.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              Eligibility data not available yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Results
