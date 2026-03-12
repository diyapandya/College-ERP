const express = require("express");
const router = express.Router();
const StudentCollection = require("../models/studentCollection.model");

router.get("/studentcollections", async (req, res) => {

  try {

    const { semester, division, search } = req.query;

    let filter = {};

    if (semester) filter.semester = Number(semester);
    if (division) filter.division = division;

    let students = await StudentCollection.find(filter);

    if (search) {
      students = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(students);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

module.exports = router;