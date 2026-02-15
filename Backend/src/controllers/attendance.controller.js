const User = require("../models/user.model");
const Timetable = require("../models/timetable.model");

exports.getStudentsForLecture = async (req, res) => {
  try {
    const { day, semester, division, batch } = req.query;

    let filter = {
      role: "student",
      semester,
      division
    };

    // If lab session → filter batch also
    if (batch) {
      filter.batch = batch;
    }

    const students = await User.find(filter)
      .select("name enrollmentNo");

    res.json(students);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

