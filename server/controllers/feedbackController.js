
const Feedback = require('../models/feedbackModel')
const CustomError = require('../utils/errorUtils')
const { asyncHelper } = require('../utils/asyncUtils')
const { notifyAdminsOfFeedback } = require('../middleware/userMiddleware')
const {
  createDocument,
  getAllDocuments, 
} = require('../utils/controllerUtils')

const createFeedback = asyncHelper(async (req, res, next) => {
 const newFeedback =  createDocument(Feedback, req.body)
 const feedback = await newFeedback(req, res, next)
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