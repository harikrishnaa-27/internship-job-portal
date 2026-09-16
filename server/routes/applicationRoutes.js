const express = require('express')
const { createApplication, getApplications } = require('../controllers/applicationController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protectAdmin, getApplications)
router.post('/', createApplication)

module.exports = router
