import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './db/conn.mjs'
dotenv.config();
const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
