import express from 'express'
import cors from 'cors'
import { send } from './email_provider/send.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.test || 5000

app.use(cors())
app.use(express.json())

// routes set
app.post('/api/email_provider/send', send)
app.get('/config', (req, res) => {
    res.json({
        apiURL: process.env.test || 'http://localhost:5000'
    })
})

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})