const jwt = require('jsonwebtoken')

const loginAdmin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const adminPassword = String(process.env.ADMIN_PASSWORD || '')
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret || !adminEmail || !adminPassword) {
    return res.status(500).json({ message: 'Admin authentication is not configured yet.' })
  }

  const submittedEmail = String(email).trim().toLowerCase()

  if (submittedEmail !== adminEmail || String(password) !== adminPassword) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const token = jwt.sign(
    {
      adminEmail,
    },
    jwtSecret,
    { expiresIn: '8h' },
  )

  return res.status(200).json({
    token,
    admin: {
      email: adminEmail,
    },
  })
}

module.exports = {
  loginAdmin,
}
