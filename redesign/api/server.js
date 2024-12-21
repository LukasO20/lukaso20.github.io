const express = require('express')
const app = express()

app.use(express.json())

// routes set
const { sendMail } = require('../api/send-email')