const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

const {
  createNotification,
  getNotifications,
  getMyNotifications
} = require("../controllers/notification.controller")

/* ADMIN / DEV */
router.post("/create", createNotification)
router.get("/all", getNotifications)

/* STUDENT */
router.get(
  "/my",
  auth,
  role("student"),
  getMyNotifications
)

module.exports = router
