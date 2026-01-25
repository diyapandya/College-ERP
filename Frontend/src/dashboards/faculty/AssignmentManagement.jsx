import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  FileText,
  Users,
  AlertCircle,
  RefreshCcw
} from "lucide-react";

import api from "../../api/axios";

const AssignmentManagement = () => {

  /* ================= STATE ================= */

  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: ""
  });


  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAssignments();
    fetchClasses();
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


  const fetchClasses = async () => {
    try {
      const res = await api.get("/faculty/my-classes");

      setClasses(res.data || []);
    } catch (err) {
      console.error("Failed to load classes", err);
    }
  };


  /* ================= FORM ================= */

  const handleChange = (e) => {
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value
    }));
  };


  /* ================= CREATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Please select a class");
      return;
    }

    try {

      await api.post("/faculty/assignment", {
        ...formData,
        subjectSlotId: selectedSlot
      });

      setShowModal(false);

      setFormData({
        title: "",
        subject: "",
        description: "",
        dueDate: ""
      });

      setSelectedSlot("");

      fetchAssignments();

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


  /* ================= STATS ================= */

  const activeCount = assignments.filter(
    (a) => new Date(a.dueDate) >= new Date()
  ).length;


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
      style={{
        background:
          "linear-gradient(135deg, rgba(91,46,255,.06), rgba(203,60,255,.06), rgba(255,138,61,.06))"
      }}
      className="min-h-screen w-full px-8 py-8"
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Create
          </button>

        </div>


        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatCard
            title="Total"
            value={assignments.length}
            icon={<FileText className="w-8 h-8 text-blue-600" />}
          />

          <StatCard
            title="Active"
            value={activeCount}
            icon={<Calendar className="w-8 h-8 text-green-600" />}
          />

          <StatCard
            title="Expired"
            value={assignments.length - activeCount}
            icon={<Users className="w-8 h-8 text-orange-600" />}
          />

        </div>


        {/* TABLE */}
        <div className="bg-white/80 backdrop-blur rounded-xl shadow border">

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr>
                {[
                  "Title",
                  "Subject",
                  "Due",
                  "Branch",
                  "Semester",
                  "Division",
                  "Actions"
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>

            </thead>


            <tbody className="divide-y">

              {assignments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">

                  <td className="px-6 py-4 font-medium">
                    {a.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {a.subject}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
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
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
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
            formData={formData}
            classes={classes}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
          />
        )}

      </div>
    </div>
  );
};


/* ================= REUSABLE ================= */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow border flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
    {icon}
  </div>
);


const Modal = ({
  formData,
  classes,
  selectedSlot,
  setSelectedSlot,
  onChange,
  onSubmit,
  onClose
}) => (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-xl max-w-lg w-full p-6">

      <h2 className="text-xl font-bold mb-4">
        Create Assignment
      </h2>

      <form onSubmit={onSubmit} className="space-y-3">

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Subject */}
        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />


        {/* CLASS SELECT */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Select Class *
          </label>

          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Class --</option>

            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.branch} - Sem {c.semester} - Div {c.division} ({c.subject})
              </option>
            ))}

          </select>
        </div>


        {/* DUE DATE */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />


        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />


        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">

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
