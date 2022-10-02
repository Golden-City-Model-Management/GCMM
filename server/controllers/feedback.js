
const Feedback = require('../models/feedback')
const CustomError = require('../utils/error')
const { asyncHelper } = require('../utils/async')
const { notifyAdminsOfFeedback } = require('../middleware/user')
const {
  getAllDocuments, 
} = require('../utils/controller')

const createFeedback = asyncHelper(async (req, res, next) => {
 const feedback = req.savedDoc
 req.statusCode = 201
 req.status = 'success' 
 req.message = 'Thank you for your feedback!'
 req.data = { feedback }
 await notifyAdminsOfFeedback()
 return next()
})

const getAllFeedBacks = getAllDocuments(Feedback)


module.exports = {
  createFeedback,
  getAllFeedBacks
}