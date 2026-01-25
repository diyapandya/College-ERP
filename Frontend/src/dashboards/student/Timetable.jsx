import { useEffect, useState } from "react";
import { Clock, MapPin, BookOpen, AlertCircle } from "lucide-react";
import api from "../../api/axios";

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  /* ================= FETCH TIMETABLE ================= */
  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/student/timetable");

      setTimetable(res.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load timetable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER BY DAY ================= */
  const getSchedulesForDay = (day) => {
    return timetable.filter((item) => item.day === day);
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading timetable...
      </div>
    );
  }

  /* ================= ERROR STATE ================= */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>

        <button
          onClick={fetchTimetable}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full px-10 py-8"
    >
      {/* ================= CONTAINER ================= */}
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Timetable
          </h1>

          <p className="text-gray-600 mt-1">
            Your weekly class schedule
          </p>
        </div>

        {/* ================= WEEK GRID ================= */}
        <div
          className="
            bg-white/80
            backdrop-blur
            rounded-2xl
            shadow-lg
            border
            border-gray-100
            overflow-hidden
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x">

            {days.map((day) => {
              const schedules = getSchedulesForDay(day);

              return (
                <div
                  key={day}
                  className="p-5 min-h-[260px]"
                >
                  {/* DAY HEADER */}
                  <h3
                    className="
                      font-semibold
                      text-gray-800
                      mb-4
                      pb-2
                      border-b
                      text-center
                    "
                  >
                    {day}
                  </h3>

                  {/* CLASSES */}
                  <div className="space-y-3">

                    {schedules.length > 0 ? (
                      schedules.map((item) => (
                        <div
                          key={item._id}
                          className="
                            bg-blue-50/70
                            rounded-xl
                            p-3
                            border
                            border-blue-100
                            hover:shadow-md
                            transition
                          "
                        >
                          {/* SUBJECT */}
                          <h4
                            className="
                              font-semibold
                              text-sm
                              text-gray-800
                              flex
                              items-center
                              gap-1
                              mb-1
                            "
                          >
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            {item.subject}
                          </h4>

                          {/* TIME */}
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.startTime} - {item.endTime}
                          </div>

                          {/* ROOM */}
                          <div className="flex items-center text-xs text-gray-600 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.room}
                          </div>

                          {/* META */}
                          <div
                            className="
                              text-[11px]
                              inline-block
                              px-2
                              py-0.5
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              font-medium
                            "
                          >
                            {item.branch} | Sem {item.semester} | {item.division}
                          </div>

                          {/* SUBSTITUTE INFO */}
                          {item.isSubstituted && (
                            <div className="mt-1 text-[10px] text-orange-600">
                              Substitute Lecture
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
                        No Classes
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentTimetable;
