const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  studentId:String,
  name:String,
  division:String,
  branch: String,
semester: Number,
  enrollment:String,
  abcId:String,
  aadhaarMasked:String,
  bloodGroup:String,
  phone:String,
  email:String,
  address:String,
  parentName:String,
  parentPhone:String,
  parentEmail:String,
  batch:String,
  mentor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Faculty",
  facultyMap: [{
  subject: String,
  facultyId: mongoose.Schema.Types.ObjectId
}]

}
})

module.exports = mongoose.model("Student", studentSchema)
