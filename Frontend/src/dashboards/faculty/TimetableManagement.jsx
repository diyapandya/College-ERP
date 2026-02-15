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

  const dummyTimetable = [
    { day: "Monday", slot: "Slot 1", subject: "SE", semester: 6, division: "A" },
    { day: "Monday", slot: "Slot 2", subject: "SE", semester: 6, division: "B" },
    { day: "Monday", slot: "Slot 3", subject: "CN Lab", semester: 5, division: "A", batch: "1" },
    { day: "Monday", slot: "Slot 4", subject: "CN Lab", semester: 5, division: "A", batch: "1" },
    { day: "Monday", slot: "Slot 6", subject: "OS", semester: 4, division: "B" },

    { day: "Tuesday", slot: "Slot 1", subject: "DBMS", semester: 4, division: "A" },
    { day: "Tuesday", slot: "Slot 3", subject: "DSA Lab", semester: 3, division: "B", batch: "2" },
    { day: "Tuesday", slot: "Slot 4", subject: "DSA Lab", semester: 3, division: "B", batch: "2" },
    { day: "Tuesday", slot: "Slot 5", subject: "AI", semester: 6, division: "A" },
    { day: "Tuesday", slot: "Slot 6", subject: "AI", semester: 6, division: "B" },

    { day: "Wednesday", slot: "Slot 3", subject: "CN", semester: 5, division: "A" },
    { day: "Wednesday", slot: "Slot 4", subject: "CN", semester: 5, division: "B" },
    { day: "Wednesday", slot: "Slot 5", subject: "Project", semester: 7, division: "A" },
    { day: "Wednesday", slot: "Slot 6", subject: "Project", semester: 7, division: "B" },

    { day: "Thursday", slot: "Slot 1", subject: "DBMS Lab", semester: 4, division: "A", batch: "1" },
    { day: "Thursday", slot: "Slot 2", subject: "DBMS Lab", semester: 4, division: "A", batch: "1" },
    { day: "Thursday", slot: "Slot 4", subject: "SE", semester: 6, division: "A" },
    { day: "Thursday", slot: "Slot 5", subject: "SE", semester: 6, division: "B" },

    { day: "Friday", slot: "Slot 1", subject: "OS", semester: 4, division: "A" },
    { day: "Friday", slot: "Slot 2", subject: "OS", semester: 4, division: "B" },
    { day: "Friday", slot: "Slot 3", subject: "AI Lab", semester: 6, division: "A", batch: "2" },
    { day: "Friday", slot: "Slot 4", subject: "AI Lab", semester: 6, division: "A", batch: "2" },

    { day: "Saturday", slot: "Slot 1", subject: "CN", semester: 5, division: "A" },
    { day: "Saturday", slot: "Slot 2", subject: "DBMS", semester: 4, division: "A" },
    { day: "Saturday", slot: "Slot 4", subject: "Project Discussion", semester: 7 }
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
            <>
              <div key={day} className="p-4 font-bold border">
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
            </>
          ))}

        </div>

      </div>
    </div>
  );
};

export default TimetableManagement;
