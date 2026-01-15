const mongoose = require("mongoose")

const marksSchema = new mongoose.Schema({
  studentId:String,
  subject:String,
  internal1:Number,
  internal2:Number,
  assignment:Number,
  total:Number
})

module.exports = mongoose.model("Marks", marksSchema)
