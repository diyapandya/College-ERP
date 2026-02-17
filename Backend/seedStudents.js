const mongoose = require("mongoose");
const Student = require("./src/models/student.model");

mongoose.connect("mongodb+srv://diyapandya_db_user:DCC3JYGCrsfPooYF@collegeerp.q8lcilw.mongodb.net/?appName=CollegeERP");

const generateStudents = async () => {
  try {
    await Student.deleteMany({ semester: 6, division: "A" });

    const students = [];

    for (let i = 1; i <= 75; i++) {
        let batch = "";

  if (i <= 25) batch = "P1";
  else if (i <= 50) batch = "P2";
  else batch = "P3";
  
      students.push({
        studentId: `STU6A${i}`,
        name: `Student ${i}`,
        division: "A",
        branch: "Computer Science",
        batch : batch,
        semester: 6,
        enrollment: `23CS6A${100 + i}`,
        email: `student${i}@college.com`,
        phone: `90000000${i}`,
        parentName: `Parent ${i}`,
        parentPhone: `80000000${i}`,
      });
    }

    await Student.insertMany(students);

    console.log("✅ 75 Students Inserted Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

generateStudents();
