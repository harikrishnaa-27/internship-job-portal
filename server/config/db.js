const mongoose = require('mongoose')

const isPlaceholderMongoURI = (value) => {
  if (!value) return true

  const placeholderValues = ['your_mongodb_connection_string', 'your_mongo_uri', '<connection-string>']

  return placeholderValues.some((placeholder) =>
    value.toLowerCase().includes(placeholder.toLowerCase()),
  )
}

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI

    if (!mongoURI || isPlaceholderMongoURI(mongoURI)) {
      console.warn('MONGO_URI is not configured. Backend will run without a live MongoDB connection.')
      return false
    }

    const connection = await mongoose.connect(mongoURI)

    console.log(`MongoDB connected: ${connection.connection.host}`)
    return true
  } catch (error) {
    console.warn(
      `MongoDB connection unavailable. Server continues in development mode: ${error.message}`,
    )
    return false
  }
}

module.exports = connectDB
