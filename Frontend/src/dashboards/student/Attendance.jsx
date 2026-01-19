import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Percent } from "lucide-react"
import api from "../../api/axios"

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [riskStatus, setRiskStatus] = useState(null)

  useEffect(() => {
    fetchAttendance()
     fetchRiskStatus()
  }, [])

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/student/attendance")
      setAttendance(res.data)
    } catch (err) {
      console.error("Failed to load attendance", err)
    }
  }
  const fetchRiskStatus = async () => {
  try {
    const res = await api.get("/student/risk-status")
    setRiskStatus(res.data)
  } catch (err) {
    console.error("Failed to load risk status", err)
  }
}

  const total = attendance.length
  const present = attendance.filter(a => a.status === "present").length
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Attendance</h1>
        <p className="text-gray-600 mt-1">
          View your subject-wise attendance
        </p>
      </div>

      {riskStatus && (
  <div
    className={`p-6 rounded-xl border ${
      riskStatus.riskFlag
        ? "bg-red-50 border-red-200"
        : "bg-green-50 border-green-200"
    }`}
  >
    <div className="flex items-center gap-3">
      {riskStatus.riskFlag ? (
        <XCircle className="w-6 h-6 text-red-600" />
      ) : (
        <CheckCircle className="w-6 h-6 text-green-600" />
      )}

      <div>
        <h3
          className={`font-semibold ${
            riskStatus.riskFlag ? "text-red-700" : "text-green-700"
          }`}
        >
          {riskStatus.riskFlag
            ? "Attendance Risk Alert"
            : "Attendance Status: Safe"}
        </h3>

        <p className="text-sm text-gray-600">
          Attendance: {riskStatus.attendancePercentage}%
          {riskStatus.riskFlag &&
            " (Below 75% – risk of detention)"}
        </p>
      </div>
    </div>
  </div>
)}


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-600 text-sm">Total Lectures</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-600 text-sm">Present</p>
          <p className="text-3xl font-bold text-green-600">{present}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-600 text-sm">Attendance %</p>
          <p className="text-3xl font-bold text-primary-600">
            {percentage}%
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {attendance.length > 0 ? (
              attendance.map((a) => (
                <tr key={a._id}>
                  <td className="px-6 py-4">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {a.subject}
                  </td>
                  <td className="px-6 py-4">
                    {a.status === "present" ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Present
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance
