const express = require('express')
const morgan = require('morgan')
const router = require('./routes/routes')
const cors = require('cors')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5173']
}))


app.use('/', router)


module.exports = app