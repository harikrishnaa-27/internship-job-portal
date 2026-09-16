const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    resumeLink: {
      type: String,
      required: true,
      trim: true,
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Opportunity',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application
