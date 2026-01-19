import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import api from "../../api/axios"; // 🔗 BACKEND INTEGRATION

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  /* --------------------------------------------------
     🔗 FETCH STUDENT TIMETABLE FROM BACKEND
     (Faculty-added data appears here automatically)
  -------------------------------------------------- */
  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await api.get("/student/timetable");
      setTimetable(res.data);
    } catch (err) {
      console.error("Failed to load timetable", err);
    }
  };

  const getSchedulesForDay = (day) => {
    return timetable.filter((t) => t.day === day);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Timetable</h1>
        <p className="text-gray-600 mt-1">
          Weekly class schedule
        </p>
      </div>

      {/* WEEKLY VIEW */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
                      key={schedule._id}
                      className="bg-primary-50 rounded-lg p-3 border border-primary-100"
                    >
                      <h4 className="font-semibold text-sm text-gray-800 mb-1">
                        {schedule.subject}
                      </h4>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{schedule.room}</span>
                        </div>
                      </div>

                      <div className="mt-2 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                        {schedule.branch} | Sem {schedule.semester} | {schedule.division}
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
    </div>
  );
};

export default StudentTimetable;
