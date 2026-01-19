const Academic = require("../models/academic.model");

/*
====================================
GET MY ACADEMIC DATA (Student Dashboard)
====================================
*/
exports.getMyAcademic = async (req, res) => {
 try {
    const data = await Academic.find({
      studentId: req.user.linkedStudentId
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


