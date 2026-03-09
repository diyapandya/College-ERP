import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  AlertCircle,
  RefreshCcw
} from "lucide-react";

import api from "../../api/axios";

const AssignmentManagement = () => {

  const location = useLocation();
  const absentStudents = location.state?.absentStudents || [];

  console.log("Absent Students:", absentStudents);

  const today = new Date().toISOString().split("T")[0];

  /* ================= STATE ================= */

 

  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    branch: "",
    division: "",
    batch: "",
    description: "",
    dueDate: "",
    attachment: null
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAssignments();
   
  }, []);

  const fetchAssignments = async () => {
    try {

      setLoading(true);
      setError("");

      const res = await api.get("/faculty/assignment");

      setAssignments(res.data || []);

    } catch (err) {

      console.error(err);
      setError("Failed to load assignments");

    } finally {

      setLoading(false);

    }
  };

  

  /* ================= FORM ================= */

  const handleChange = (e) => {

    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value
    }));

  };

  const handleFile = (e) => {

    setFormData(prev => ({
      ...prev,
      attachment: e.target.files[0]
    }));

  };

  /* ================= CREATE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

  

    try {
await api.post("/faculty/assignment", {
  title: formData.title,
  subject: formData.subject,
  branch: formData.branch, 
  semester: formData.semester,
  division: formData.division,
  batch: formData.batch,
  description: formData.description,
  dueDate: formData.dueDate,
  studentIds: absentStudents.map(s => s.id)
});
      setShowModal(false);

      setFormData({
        title: "",
        subject: "",
        branch: "",
        semester: "",
        division: "",
        batch: "",
        description: "",
        dueDate: "",
        attachment: null
      });

      
      fetchAssignments();

      alert("Assignment created and sent to absent students");

    } catch (err) {

      console.error(err);
      alert("Failed to create assignment");

    }

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!confirm("Delete this assignment?")) return;

    try {

      await api.delete(`/faculty/assignment/${id}`);

      fetchAssignments();

    } catch {

      alert("Delete failed");

    }

  };

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading assignments...
      </div>
    );

  }

  /* ================= ERROR ================= */

  if (error) {

    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">

        <AlertCircle className="w-8 h-8 mb-2" />

        {error}

        <button
          onClick={fetchAssignments}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <RefreshCcw size={16} />
          Retry
        </button>

      </div>
    );

  }

  /* ================= UI ================= */

  return (

    <div
      className="min-h-screen w-full px-8 py-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(91,46,255,.06), rgba(203,60,255,.06), rgba(255,138,61,.06))"
      }}
    >

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Assignment Management
            </h1>

            <p className="text-gray-600 mt-1">
              Manage student assignments
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={18} />
            Create Assignment
          </button>

        </div>

        {/* ABSENT STUDENTS */}

        {absentStudents.length > 0 && (

          <div className="bg-white rounded-xl shadow border p-6">

            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Absent Students ({absentStudents.length})
            </h2>

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-6 py-3 text-left text-sm">
                    Student ID
                  </th>

                  <th className="px-6 py-3 text-left text-sm">
                    Student Name
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {absentStudents.map((student, index) => (

                  <tr key={index}>

                    <td className="px-6 py-3">
                      {student.id}
                    </td>

                    <td className="px-6 py-3">
                      {student.name}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* ASSIGNMENT TABLE */}

        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="px-6 py-4 text-left text-xs">Title</th>
                <th className="px-6 py-4 text-left text-xs">Subject</th>
                <th className="px-6 py-4 text-left text-xs">Due</th>
                <th className="px-6 py-4 text-left text-xs">Branch</th>
                <th className="px-6 py-4 text-left text-xs">Semester</th>
                <th className="px-6 py-4 text-left text-xs">Division</th>
                <th className="px-6 py-4 text-left text-xs">Actions</th>

              </tr>

            </thead>

            <tbody className="divide-y">

              {assignments.map((a) => (

                <tr key={a._id}>

                  <td className="px-6 py-4 font-medium">
                    {a.title}
                  </td>

                  <td className="px-6 py-4">
                    {a.subject}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(a.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {a.branch}
                  </td>

                  <td className="px-6 py-4">
                    {a.semester}
                  </td>

                  <td className="px-6 py-4">
                    {a.division}
                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() => handleDelete(a._id)}
                      className="p-2 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MODAL */}

        {showModal && (

          <Modal
            today={today}
            formData={formData}
            setFormData={setFormData}
            handleFile={handleFile}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
          />

        )}

      </div>

    </div>

  );

};

/* ================= MODAL ================= */

const Modal = ({
  today,
  formData,
  handleFile,
  onChange,
  onSubmit,
  onClose
}) => (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

  <div className="bg-white rounded-xl w-full max-w-lg p-6">

    <h2 className="text-xl font-bold mb-4">
      Create Assignment
    </h2>

    <form onSubmit={onSubmit} className="space-y-4">

      {/* TITLE */}

      <div>
        <label className="text-sm font-medium">Assignment Title</label>
        <input
          name="title"
          placeholder="Enter assignment title"
          value={formData.title}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>


      {/* SUBJECT */}

      <div>
        <label className="text-sm font-medium">Subject</label>
        <input
          name="subject"
          placeholder="Enter subject name"
          value={formData.subject}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>

      <div>
  <label className="text-sm font-medium">Branch</label>
  <input
    name="branch"
    placeholder="Enter branch (CE, IT, CS)"
    value={formData.branch}
    onChange={onChange}
    required
    className="w-full border px-3 py-2 rounded mt-1"
  />
</div>


      {/* SEMESTER */}

      <div>
        <label className="text-sm font-medium">Semester</label>

        <select
          name="semester"
          value={formData.semester}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        >
          <option value="">Select Semester</option>

          {[1,2,3,4,5,6,7,8].map((sem)=>(
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}

        </select>
      </div>


      {/* DIVISION */}

      <div>
        <label className="text-sm font-medium">Division</label>

        <select
          name="division"
          value={formData.division}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        >

          <option value="">Select Division</option>

          {["A","B","C","D","E","F","G","P","I","J","K","Q"].map((div)=>(
            <option key={div} value={div}>
              {div}
            </option>
          ))}

        </select>

      </div>


      {/* BATCH */}

      <div>
        <label className="text-sm font-medium">Batch</label>

        <select
          name="batch"
          value={formData.batch}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        >

          <option value="">Select Batch</option>

          {[1,2,3].map((b)=>(
            <option key={b} value={b}>
              Batch {b}
            </option>
          ))}

        </select>

      </div>


      {/* TODAY DATE */}

      <div>
        <label className="text-sm font-medium">Assignment Created Date</label>
        <input
          value={today}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 mt-1"
        />
      </div>


      {/* DUE DATE */}

      <div>
        <label className="text-sm font-medium">Due Date</label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded mt-1"
        />

      </div>


      {/* ATTACHMENT */}

      <div>
        <label className="text-sm font-medium">Attachment</label>

        <input
          type="file"
          onChange={handleFile}
          className="w-full mt-1"
        />

      </div>


      {/* DESCRIPTION */}

      <div>
        <label className="text-sm font-medium">Description</label>

        <textarea
          name="description"
          placeholder="Assignment description"
          value={formData.description}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded mt-1"
        />

      </div>


      {/* BUTTONS */}

      <div className="flex gap-3 pt-3">

        <button
          type="button"
          onClick={onClose}
          className="flex-1 border py-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Create
        </button>

      </div>

    </form>

  </div>

</div>

);

export default AssignmentManagement;