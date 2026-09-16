const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const opportunityRoutes = require('./routes/opportunityRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('CORS policy does not allow this origin.'))
    },
    credentials: false,
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Internship & Job Listing Portal backend is running.',
    status: 'ok',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/opportunities', opportunityRoutes)
app.use('/api/applications', applicationRoutes)

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} without a live database connection.`)
    })
  }
}

startServer()
