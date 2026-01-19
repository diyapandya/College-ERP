const jwt = require("jsonwebtoken")
const Student = require("../models/student.model")

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json("No Token")

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Base payload (available for all roles)
    let userPayload = {
      id: decoded.id,
      role: decoded.role,
      linkedStudentId: decoded.linkedStudentId || null,
      linkedFacultyId: decoded.linkedFacultyId || null
    }

    /* -------------------------------------------------
       ✅ ALLOW STUDENT PROFILE CREATION (ONE-TIME)
       ------------------------------------------------- */
    if (
      decoded.role === "student" &&
      req.method === "POST" &&
      req.originalUrl === "/api/student/profile"
    ) {
      req.user = userPayload
      return next()
    }

    /* -------------------------------------------------
       🔐 ENFORCE STUDENT PROFILE FOR OTHER STUDENT APIs
       ------------------------------------------------- */
    if (decoded.role === "student" &&
  req.originalUrl.startsWith("/api/student")) {
      const student = await Student.findOne({
        studentId: decoded.linkedStudentId
      })

      if (!student) {
        return res.status(404).json("Student Profile Missing")
      }

      userPayload = {
        ...userPayload,
        branch: student.branch,
        semester: student.semester,
        division: student.division
      }
    }

    req.user = userPayload
    next()
  } catch (err) {
    return res.status(401).json("Invalid Token")
  }
}
