const mongoose = require("mongoose")

const marksSchema = new mongoose.Schema({
  studentId:String,
  subject:String,
  examType:String,
  marks:Number,
  remarks:String,
  facultyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty"
  }
})

module.exports = mongoose.model("Marks", marksSchema)
