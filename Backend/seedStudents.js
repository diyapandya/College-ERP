const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

/* ================= CONNECT DATABASE ================= */

mongoose.connect(
  "mongodb+srv://diyapandya_db_user:DCC3JYGCrsfPooYF@collegeerp.q8lcilw.mongodb.net/test"
);

/* ================= STUDENT SCHEMA ================= */

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  division: String,
  branch: String,
  semester: Number,
  enrollment: String,
  batch: String,
  phone: String,
  email: String,
  parentName: String,
  parentPhone: String,
  linkedFacultyId: String
});

const Student = mongoose.model("Student", studentSchema);

/* ================= STUDENT GENERATOR ================= */

function generateStudents(count, semester, division, batch = null) {

  const students = [];

  for (let i = 1; i <= count; i++) {

    students.push({
      studentId: `STU${semester}${division}${i}`,
      name: faker.person.fullName(),
      division,
      branch: "Computer Science",
      semester,
      enrollment: `23CS${semester}${division}${100 + i}`,
      batch,
      phone: faker.phone.number("9#########"),
      email: faker.internet.email(),
      parentName: faker.person.fullName(),
      parentPhone: faker.phone.number("8#########"),
      linkedFacultyId: "FAC109"
    });

  }

  return students;
}

/* ================= SEED FUNCTION ================= */

async function seedStudents() {

  try {

    /* DELETE OLD DATA */
    await Student.deleteMany({});
    console.log("Old students deleted");

    let allStudents = [];

       // SEM 6
    allStudents.push(...generateStudents(75, 6, "A"));
    allStudents.push(...generateStudents(75, 6, "B"));

    // SEM 5 FULL DIVISIONS (LECTURES)
    allStudents.push(...generateStudents(75, 5, "B"));
    allStudents.push(...generateStudents(75, 5, "C"));

    // SEM 5 LAB BATCHES
    allStudents.push(...generateStudents(25, 5, "B", "Batch 2"));
    allStudents.push(...generateStudents(25, 5, "C", "Batch 2"));

    // SEM 4
    allStudents.push(...generateStudents(75, 4, "A"));
    allStudents.push(...generateStudents(75, 4, "B"));

    // SEM 7
    allStudents.push(...generateStudents(75, 7, "B"));

        // SEM 4 OTHER LAB GROUPS
    allStudents.push(...generateStudents(25, 4, "E", "Batch 3"));
    allStudents.push(...generateStudents(25, 4, "P", "Batch 3"));

    // SEM 5 OTHER LAB GROUPS
    allStudents.push(...generateStudents(25, 5, "E", "Batch 1"));
    allStudents.push(...generateStudents(25, 5, "P", "Batch 1"));


     // SEM 6 OTHER LAB GROUPS

    allStudents.push(...generateStudents(25, 6, "A", "Batch 1"));
    allStudents.push(...generateStudents(25, 6, "B", "Batch 1"));

    await Student.insertMany(allStudents);

    console.log("✅ 625 Students Inserted Successfully");

  } catch (error) {

    console.error("Error seeding students:", error);

  } finally {

    mongoose.connection.close();

  }

}

seedStudents();