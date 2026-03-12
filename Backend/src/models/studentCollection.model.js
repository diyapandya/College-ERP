const mongoose = require("mongoose");

const studentCollectionSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  division: String,
  branch: String,
  semester: Number,
  enrollment: String,
  phone: String,
  email: String,
  parentName: String,
  parentPhone: String
});

module.exports = mongoose.model(
  "StudentCollection",
  studentCollectionSchema,
  "studentcollections"
);