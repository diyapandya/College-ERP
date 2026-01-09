const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', require('./routes'))
const rateLimit = require('./middleware/rateLimit.middleware')
app.use(rateLimit)

module.exports = app
