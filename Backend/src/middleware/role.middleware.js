module.exports = role => (req, res, next) => {
  console.log("ROLE IN TOKEN:", req.user.role)
  console.log("ROLE REQUIRED:", role)

  if (req.user.role !== role)
    return res.status(403).json("Access Denied")

  next()
}
