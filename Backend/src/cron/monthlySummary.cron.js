const cron = require("node-cron")
const {
  generateMonthlySummaries
} = require("../services/monthlySummary.service")

// Runs at 11:59 PM on last day of every month
cron.schedule("59 23 28-31 * *", async () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (tomorrow.getDate() === 1) {
    await generateMonthlySummaries()
  }
})
