require("dotenv").config()
const app = require("./app")
const mongoose = require("mongoose")
require("./cron/monthlySummary.cron")

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, () =>
      console.log(`Server Started on port ${PORT}`)
    )
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message)
  })
