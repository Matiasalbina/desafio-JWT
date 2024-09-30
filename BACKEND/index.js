require('dotenv').config()
const server = require('./src/app')
const { initDB } = require('./src/db/config')

const { PORT } = process.env


server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`)
    await initDB()
})