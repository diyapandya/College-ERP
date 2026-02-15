const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
=======
const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true,  required: true,},
  password:String,
  role:{type:String,enum:['student','faculty','parent','admin']},
  linkedStudentId:String,
   isVerified: { type: Boolean, default: false },
   linkedFacultyId:String,
   isVerified: { type: Boolean, default: false },
  otp: Number,
otpExpiry: Date
})
>>>>>>> 334026d55b69dfe272dbc396ccf4647c0b1b2d26

    email: { 
      type: String, 
      unique: true, 
      required: true 
    },

    password: { 
      type: String, 
      required: true 
    },

    role: { 
      type: String, 
      enum: ["student", "faculty", "parent", "admin"],
      required: true
    },

    // 🔹 New Field (for students)
    enrollmentNo: { 
      type: String, 
      unique: true, 
      sparse: true 
    },

   
    linkedFacultyId: { 
      type: String,
       unique: true, 
      sparse: true 
    },

    // 🔹 OTP Verification
    otp: { 
      type: String 
    },

    otpExpiry: { 
      type: Date 
    },

    isVerified: { 
      type: Boolean, 
      default: false 
    }
  }
 
)
module.exports = mongoose.model("User", userSchema);
