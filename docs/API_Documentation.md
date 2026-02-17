📘 College ERP System – API Documentation
Student & Faculty Modules
📌 Base URL
http://localhost:5000/api

(Replace with deployed URL when hosting)

🔐 AUTHENTICATION APIs

All users must authenticate before accessing the system.

1️⃣ Register User

POST

/auth/register
{
"name": "NiraliPratik Pandya",
"email": "niralip@student.com",
"password": "nirali",
"role": "student",
"linkedStudentId": "23BECE30496"
}
Body
{
"name": "Diya Pandya",
"email": "diya@student.com",
"password": "123456",
"role": "student",
"linkedStudentId": "23BECE30494"
}
"otp": 821994
2️⃣ Verify OTP

POST

/auth/verify-signup-otp

Body
{
"email": "diya@student.com",
"otp": "123456"
}

3️⃣ Login

POST

/auth/login

Body
{
"email": "diya@student.com",
"password": "123456"
}

Response
{
"token": "JWT_TOKEN",
"role": "student"
}

Use this token in all secured APIs.

🎓 STUDENT MODULE APIs

All student APIs require:

Authorization: Bearer <TOKEN>

4️⃣ Create / Update Profile

POST

/student/profile

Body
{
"studentId": "23BECE30494",
"name": "Diya Pandya",
"branch": "CE",
"semester": 6,
"division": "P",
"batch": "P1"
}

5️⃣ Get Profile

GET

/student/profile

6️⃣ Get Timetable

GET

/student/timetable

7️⃣ Get Attendance

GET

/student/attendance

8️⃣ Attendance Status

GET

/student/attendance-status

9️⃣ Attendance Summary

GET

/student/attendance-summary

🔟 Get Marks

GET

/student/marks

1️⃣1️⃣ Risk Status

GET

/student/risk-status

1️⃣2️⃣ Get Assignments

GET

/student/assignments

1️⃣3️⃣ Get Results

GET

/student/results

1️⃣4️⃣ Exam Eligibility

GET

/student/eligibility

1️⃣5️⃣ Monthly Summary

GET

/student/monthly-summary

1️⃣6️⃣ Student Dashboard

GET

/student/dashboard

1️⃣7️⃣ Subjects

GET

/student/subjects

1️⃣8️⃣ Upload Certificate

POST

/student/certificate

Body
{
"title": "NPTEL AI Course",
"issuer": "IIT Madras",
"year": 2025
}

1️⃣9️⃣ View Certificates

GET

/student/certificates

👨‍🏫 FACULTY MODULE APIs

All faculty APIs require:

Authorization: Bearer <TOKEN>

Role must be faculty.

2️⃣0️⃣ Add Assignment

POST

/faculty/assignment

Body
{
"title": "Python Project",
"subject": "Python",
"description": "Mini Project",
"dueDate": "2026-02-10",
"branch": "CE",
"semester": 6,
"division": "P"
}

2️⃣1️⃣ Submit Attendance

POST

/faculty/attendance

Body
{
"subject": "Python",
"date": "2026-01-25",
"slot": {
"start": "10:00",
"end": "11:00"
},
"branch": "CE",
"semester": 6,
"division": "P",
"batch": "P1",
"presentStudents": [
"23BECE30494",
"23BECE30495"
]
}

2️⃣2️⃣ Get At-Risk Students

GET

/faculty/at-risk

2️⃣3️⃣ Submit Marks

POST

/faculty/marks

Body
{
"studentId": "23BECE30494",
"subject": "Python",
"internal1": 18,
"internal2": 20,
"assignment": 15
}

2️⃣4️⃣ Add Timetable

POST

/faculty/timetable

Body
{
"subject": "Python",
"day": "Monday",
"startTime": "10:00",
"endTime": "11:00",
"room": "C-203",
"branch": "CE",
"semester": 6,
"division": "P"
}

2️⃣5️⃣ Get Faculty Timetable

GET

/faculty/timetable

2️⃣6️⃣ Assign Substitute Faculty

POST

/faculty/substitute

Body
{
"timetableId": "65a1bc...",
"newFacultyId": "64fd23...",
"remarks": "On leave"
}

2️⃣7️⃣ Add Result

POST

/faculty/result

Body
{
"studentId": "23BECE30494",
"subject": "Python",
"semester": 6,
"marks": 75
}

2️⃣8️⃣ Monthly Summaries

GET

/faculty/monthly-summaries

2️⃣9️⃣ Get Students (Division Wise)

GET

/faculty/students?branch=CE&semester=6&division=P

3️⃣0️⃣ Student Vault

GET

/faculty/student-vault/23BECE30494

3️⃣1️⃣ My Classes

GET

/faculty/my-classes

3️⃣2️⃣ My Students

GET

/faculty/my-students?branch=CE&semester=6&division=P

3️⃣3️⃣ My Mentees

GET

/faculty/my-mentees

🔒 AUTHORIZATION RULES
Role Access
Student /student/_
Faculty /faculty/_
Admin (Future Scope)
Parent (Future Scope)

Unauthorized access returns:

403 Access Denied

📊 ELIGIBILITY RULES
Condition Requirement
Attendance ≥ 75%
Marks ≥ 40

If failed → Not Eligible.

📌 TOKEN USAGE

All secured APIs require:

Authorization: Bearer JWT_TOKEN

Without token → 401 Unauthorized.

📈 SYSTEM FEATURES

✔ JWT Authentication
✔ Role-Based Access
✔ Attendance Automation
✔ Eligibility Engine
✔ Mentor System
✔ Notifications
✔ Monthly Reports

📍 TESTING ORDER (Recommended)

Register

Verify OTP

Login

Create Profile

Timetable

Attendance

Marks

Eligibility

Dashboard

Reports

📘 CONCLUSION

This API system provides a complete backend solution for managing academic activities of students and faculty. It ensures secure access, real-time evaluation, and transparency in academic monitoring.
