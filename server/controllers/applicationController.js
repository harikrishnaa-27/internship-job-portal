const mongoose = require('mongoose')
const Opportunity = require('../models/Opportunity')
const Application = require('../models/Application')

const createApplication = async (req, res, next) => {
  try {
    const { studentName, email, phone, resumeLink, opportunityId } = req.body

    if (!studentName || !email || !phone || !resumeLink || !opportunityId) {
      return res.status(400).json({
        message: 'Please provide studentName, email, phone, resumeLink, and opportunityId.',
      })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ message: 'Please enter a valid email address.' })
    }

    if (!mongoose.Types.ObjectId.isValid(opportunityId)) {
      return res.status(400).json({ message: 'Invalid opportunity ID.' })
    }

    const opportunityExists = await Opportunity.findById(opportunityId)
    if (!opportunityExists) {
      return res.status(404).json({ message: 'Opportunity not found.' })
    }

    const newApplication = await Application.create({
      studentName: studentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      resumeLink: resumeLink.trim(),
      opportunityId,
    })

    return res.status(201).json({
      _id: newApplication._id,
      studentName: newApplication.studentName,
      email: newApplication.email,
      phone: newApplication.phone,
      resumeLink: newApplication.resumeLink,
      opportunityId: newApplication.opportunityId,
      appliedDate: newApplication.appliedDate,
    })
  } catch (error) {
    next(error)
  }
}

const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find().populate('opportunityId').sort({ appliedDate: -1 })
    res.status(200).json(applications)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createApplication,
  getApplications,
}
