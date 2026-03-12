const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

/* ================= DATABASE ================= */

mongoose.connect(
 "mongodb+srv://diyapandya_db_user:DCC3JYGCrsfPooYF@collegeerp.q8lcilw.mongodb.net/test"
);

/* ================= SCHEMA ================= */

const studentSchema = new mongoose.Schema({

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

/* ================= COLLECTION ================= */

const Student = mongoose.model(
  "StudentCollections",
  studentSchema,
  "StudentCollections"
);
/* ================= SEM + DIV ================= */

const semesters = [1,2,3,4,5,6,7,8];

const divisions = ["A","B","C","D","E","F","I","J","K","P","Q"];

/* ================= GENERATOR ================= */

function generateStudents(semester, division){

  const students = [];

  for(let i=1;i<=75;i++){

    students.push({

      studentId:`STU-${semester}-${division}-${i}`,

      name:faker.person.fullName(),

      division:division,

      branch:"Computer Engineering",

      semester:semester,

      enrollment:`23CE${semester}${division}${100+i}`,

      phone:faker.phone.number("9#########"),

      email:faker.internet.email(),

      parentName:faker.person.fullName(),

      parentPhone:faker.phone.number("8#########")

    });

  }

  return students;

}

/* ================= SEED ================= */

async function seedStudentCollections(){

  try{

    await Student.deleteMany({});
    console.log("Old students deleted");

    let allStudents=[];

    semesters.forEach(sem=>{
      divisions.forEach(div=>{
        allStudents.push(...generateStudents(sem,div));
      });
    });

    await Student.insertMany(allStudents);

    console.log(`Inserted ${allStudents.length} students`);

  }

  catch(err){

    console.error(err);

  }

  finally{

    mongoose.connection.close();

  }

}

seedStudentCollections();