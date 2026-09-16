const mongoose = require('mongoose')
const Opportunity = require('../models/Opportunity')

const checkDatabaseAvailability = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      message: 'MongoDB is not connected. Configure MONGO_URI to enable full CRUD operations.',
    })
    return true
  }

  return false
}

const getOpportunities = async (req, res, next) => {
  try {
    if (checkDatabaseAvailability(res)) {
      return
    }

    const opportunities = await Opportunity.find()
    res.status(200).json(opportunities)
  } catch (error) {
    next(error)
  }
}

const getOpportunityById = async (req, res, next) => {
  try {
    if (checkDatabaseAvailability(res)) {
      return
    }

    const opportunity = await Opportunity.findById(req.params.id)

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' })
    }

    res.status(200).json(opportunity)
  } catch (error) {
    next(error)
  }
}

const createOpportunity = async (req, res, next) => {
  try {
    if (checkDatabaseAvailability(res)) {
      return
    }

    const {
      title,
      company,
      domain,
      location,
      experience,
      description,
      applicationLink,
    } = req.body

    if (!title || !company || !domain || !location || !experience || !description || !applicationLink) {
      return res.status(400).json({ message: 'Please provide all required opportunity fields.' })
    }

    const newOpportunity = await Opportunity.create({
      title,
      company,
      domain,
      location,
      experience,
      description,
      applicationLink,
    })

    res.status(201).json(newOpportunity)
  } catch (error) {
    next(error)
  }
}

const updateOpportunity = async (req, res, next) => {
  try {
    if (checkDatabaseAvailability(res)) {
      return
    }

    const opportunity = await Opportunity.findById(req.params.id)

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' })
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )

    res.status(200).json(updatedOpportunity)
  } catch (error) {
    next(error)
  }
}

const deleteOpportunity = async (req, res, next) => {
  try {
    if (checkDatabaseAvailability(res)) {
      return
    }

    const opportunity = await Opportunity.findById(req.params.id)

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' })
    }

    await Opportunity.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Opportunity deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
}
