import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import api from "../../api/axios"

const ResultsManagement = () => {
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    studentId: "",
    subject: "Data Structures",
    internal1: "",
    internal2: "",
    assignment: ""
  })

  /* ---------------- INPUT HANDLER ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /* ---------------- SUBMIT MARKS ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.studentId ||
      !formData.internal1 ||
      !formData.internal2 ||
      !formData.assignment
    ) {
      alert("Please fill all required fields")
      return
    }

    try {
      await api.post("/faculty/marks", {
        studentId: formData.studentId,
        subject: formData.subject,
        internal1: Number(formData.internal1),
        internal2: Number(formData.internal2),
        assignment: Number(formData.assignment)
      })

      alert("Marks submitted successfully")

      setFormData({
        studentId: "",
        subject: "Data Structures",
        internal1: "",
        internal2: "",
        assignment: ""
      })

      setShowModal(false)
    } catch (err) {
      alert(err.response?.data || "Failed to submit marks")
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Results Management
          </h1>
          <p className="text-gray-600 mt-1">
            Submit student marks (grade auto-calculated by system)
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <Upload className="w-5 h-5" />
            Import
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Add Marks
          </button>
        </div>
      </div>

      {/* INFO CARD */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
        ⚠️ Grades, eligibility & risk are calculated automatically by backend.
        Faculty should only enter raw marks.
      </div>

      {/* ADD MARKS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Student Marks</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Student ID (e.g. 21CE045)"
                className="w-full border px-4 py-2 rounded"
                required
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option>Data Structures</option>
                <option>Algorithms</option>
                <option>DBMS</option>
                <option>Operating Systems</option>
              </select>

              <input
                name="internal1"
                type="number"
                value={formData.internal1}
                onChange={handleInputChange}
                placeholder="Internal 1 Marks"
                className="w-full border px-4 py-2 rounded"
                required
              />

              <input
                name="internal2"
                type="number"
                value={formData.internal2}
                onChange={handleInputChange}
                placeholder="Internal 2 Marks"
                className="w-full border px-4 py-2 rounded"
                required
              />

              <input
                name="assignment"
                type="number"
                value={formData.assignment}
                onChange={handleInputChange}
                placeholder="Assignment Marks"
                className="w-full border px-4 py-2 rounded"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-2 rounded"
                >
                  Save Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultsManagement
