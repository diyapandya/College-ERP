import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Clock, MapPin } from "lucide-react";

const TimetableManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    day: "Monday",
    course: "",
    time: "",
    room: "",
    section: "",
  });

  // Initialize from localStorage or use default data
  const [schedules, setSchedules] = useState(() => {
    const savedSchedules = localStorage.getItem("studentPortal_schedules");
    if (savedSchedules) {
      return JSON.parse(savedSchedules);
    }
    return [
      {
        id: 1,
        day: "Monday",
        time: "9:00 AM - 10:30 AM",
        course: "Data Structures",
        room: "Room 301",
        section: "CS-A",
      },
      {
        id: 2,
        day: "Monday",
        time: "11:00 AM - 12:30 PM",
        course: "Algorithms",
        room: "Room 205",
        section: "CS-B",
      },
      {
        id: 3,
        day: "Tuesday",
        time: "10:00 AM - 11:30 AM",
        course: "Web Development",
        room: "Lab 102",
        section: "CS-A",
      },
      {
        id: 4,
        day: "Wednesday",
        time: "2:00 PM - 3:30 PM",
        course: "Database Systems",
        room: "Room 301",
        section: "CS-B",
      },
      {
        id: 5,
        day: "Thursday",
        time: "9:00 AM - 10:30 AM",
        course: "Software Engineering",
        room: "Room 205",
        section: "CS-A",
      },
    ];
  });

  // Save to localStorage whenever schedules change
  useEffect(() => {
    localStorage.setItem("studentPortal_schedules", JSON.stringify(schedules));
  }, [schedules]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.course ||
      !formData.time ||
      !formData.room ||
      !formData.section
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      day: formData.day,
      time: formData.time,
      course: formData.course,
      room: formData.room,
      section: formData.section,
    };

    setSchedules([...schedules, newSchedule]);
    setFormData({
      day: "Monday",
      course: "",
      time: "",
      room: "",
      section: "",
    });
    setShowModal(false);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getSchedulesForDay = (day) => {
    return schedules
      .filter((s) => s.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
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
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Weekly Timetable View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x">
          {days.map((day) => (
            <div key={day} className="p-4">
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">
                {day}
              </h3>
              <div className="space-y-3">
                {getSchedulesForDay(day).length > 0 ? (
                  getSchedulesForDay(day).map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-primary-50 rounded-lg p-3 border border-primary-100"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-800">
                          {schedule.course}
                        </h4>
                        <div className="flex space-x-1">
                          <button className="p-1 text-primary-600 hover:bg-primary-100 rounded">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(schedule.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{schedule.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{schedule.room}</span>
                        </div>
                        <div className="mt-1 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded">
                          {schedule.section}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No classes
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Schedule
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day *
                </label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Data Structures"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 9:00 AM - 10:30 AM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room *
                </label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Room 301"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section *
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., CS-A"
                  required
                />
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
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableManagement;
