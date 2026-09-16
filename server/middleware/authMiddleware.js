const jwt = require('jsonwebtoken')

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required.' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'Malformed authorization header.' })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.adminEmail) {
      return res.status(401).json({ message: 'Invalid token.' })
    }

    req.admin = { email: decoded.adminEmail }
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = {
  protectAdmin,
}
