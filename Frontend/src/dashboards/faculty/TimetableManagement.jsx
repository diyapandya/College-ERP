import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TimetableManagement = () => {

  const navigate = useNavigate();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const slots = [
    "Slot 1",
    "Slot 2",
    "Slot 3",
    "Slot 4",
    "Slot 5",
    "Slot 6"
  ];

  /* ================= UPDATED DUMMY TIMETABLE =================
     Division changed to "P" (to match seeded data)
     Lab sessions include batch (P1, P2, P3)
  ============================================================ */

  const dummyTimetable = [

    // THEORY (All 75 students of 6P)
    { day: "Monday", slot: "Slot 1", subject: "SE", semester: 6, division: "P" },

    // LAB (Only Batch P2 → students 26–50)
    { day: "Tuesday", slot: "Slot 3", subject: "SE Lab", semester: 6, division: "P", batch: "P2" },
    { day: "Tuesday", slot: "Slot 4", subject: "SE Lab", semester: 6, division: "P", batch: "P2" },

    // LAB (Batch P1 → students 1–25)
    { day: "Wednesday", slot: "Slot 2", subject: "AI Lab", semester: 6, division: "P", batch: "P1" },

    // LAB (Batch P3 → students 51–75)
    { day: "Thursday", slot: "Slot 5", subject: "CN Lab", semester: 6, division: "P", batch: "P3" },

    // Another class example (Sem 4 Div D)
    { day: "Friday", slot: "Slot 1", subject: "DBMS", semester: 4, division: "D" }

  ];

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    setSchedules(dummyTimetable);
  }, []);

  const getLecture = (day, slot) => {
    return schedules.find(s => s.day === day && s.slot === slot);
  };

  const handleClick = (lecture) => {
    navigate("/faculty/attendance", { state: lecture });
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Faculty Timetable
      </h1>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">

        <div className="grid grid-cols-7 min-w-[1000px]">

          <div className="p-4 font-bold border">Day</div>

          {slots.map(slot => (
            <div key={slot} className="p-4 font-bold border text-center">
              {slot}
            </div>
          ))}

          {days.map(day => (
            <div key={day} className="contents">

              <div className="p-4 font-bold border">
                {day}
              </div>

              {slots.map(slot => {
                const lecture = getLecture(day, slot);

                return (
                  <div key={slot + day} className="p-3 border min-h-[100px]">

                    {lecture ? (
                      <div
                        onClick={() => handleClick(lecture)}
                        className="bg-primary-50 p-2 rounded cursor-pointer hover:bg-primary-100 transition"
                      >
                        <h4 className="font-semibold">
                          {lecture.subject}
                        </h4>

                        <div className="text-xs mt-1">
                          Sem {lecture.semester}
                          {lecture.division && ` - ${lecture.division}`}
                        </div>

                        {lecture.batch && (
                          <div className="text-xs text-blue-600">
                            Batch {lecture.batch}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-300 text-sm">
                        FREE
                      </span>
                    )}

                  </div>
                );
              })}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default TimetableManagement;
