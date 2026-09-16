const express = require('express')
const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getOpportunities)
router.get('/:id', getOpportunityById)
router.post('/', protectAdmin, createOpportunity)
router.put('/:id', protectAdmin, updateOpportunity)
router.delete('/:id', protectAdmin, deleteOpportunity)

module.exports = router
