import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Clock, MapPin } from "lucide-react";
import api from "../../api/axios"; // 🔗 BACKEND INTEGRATION (ADDED)

const TimetableManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    day: "Monday",
    subject: "",
    startTime: "",
    endTime: "",
    room: "",
    branch: "",
    semester: "",
    division: "",
  });

  const [schedules, setSchedules] = useState([]);

  /* --------------------------------------------------
     🔗 FETCH TIMETABLE FROM BACKEND (ADDED)
  -------------------------------------------------- */
  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await api.get("/faculty/timetable");
      setSchedules(res.data);
    } catch (err) {
      console.error("Failed to load timetable", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* --------------------------------------------------
     🔗 SUBMIT TIMETABLE TO BACKEND (CHANGED)
  -------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/faculty/timetable", formData);
      alert("Timetable added successfully");

      setShowModal(false);
      setFormData({
        day: "Monday",
        subject: "",
        startTime: "",
        endTime: "",
        room: "",
        branch: "",
        semester: "",
        division: "",
      });

      fetchTimetable(); // 🔄 refresh data
    } catch (err) {
      alert(err.response?.data || "Failed to add timetable");
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getSchedulesForDay = (day) => {
    return schedules.filter((s) => s.day === day);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Timetable Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage class schedules and timings
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* WEEKLY VIEW */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-x">
          {days.map((day) => (
            <div key={day} className="p-4">
              <h3 className="font-bold mb-4">{day}</h3>

              {getSchedulesForDay(day).map((s) => (
                <div key={s._id} className="bg-primary-50 p-3 rounded mb-3">
                  <h4 className="font-semibold">{s.subject}</h4>
                  <div className="text-sm text-gray-600">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {s.startTime} - {s.endTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {s.room}
                  </div>
                  <span className="text-xs bg-primary-100 px-2 rounded">
                    {s.branch} | Sem {s.semester} | {s.division}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Timetable</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <select name="day" onChange={handleInputChange} value={formData.day}>
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <input name="subject" placeholder="Subject" onChange={handleInputChange} />
              <input name="startTime" placeholder="Start Time" onChange={handleInputChange} />
              <input name="endTime" placeholder="End Time" onChange={handleInputChange} />
              <input name="room" placeholder="Room" onChange={handleInputChange} />
              <input name="branch" placeholder="Branch (CSE)" onChange={handleInputChange} />
              <input name="semester" placeholder="Semester" onChange={handleInputChange} />
              <input name="division" placeholder="Division" onChange={handleInputChange} />
               

              <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableManagement;
