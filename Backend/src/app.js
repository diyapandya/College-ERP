const express = require('express')
const cors = require('cors')
const rateLimit = require('./middleware/rateLimit.middleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit)
app.use('/api', require('./routes'))



module.exports = app
