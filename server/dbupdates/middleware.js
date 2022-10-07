
const { asyncHelper } = require('../utils/async')
const { createCustomError } = require('../utils/controller')
const Model = require('../models/model')
const Feedback = require('../models/feedback')
const User = require('../models/user')
const Portfolio = require('../models/portfolio')
const ModelApplication = require('../models/modelApplication')
const Gallery = require('../models/gallery')

const models = {
  'model': Model,
  'feedback': Feedback,
  'portfolio': Portfolio,
  'gallery': Gallery,
  'model-application': ModelApplication,
  'portfolio': Portfolio,
  'user': User
}

module.exports.getModel = asyncHelper(async (req, res, next) => {
  if(!req.body.model) return next(createCustomError('Please specify the data Model.', 400))
  const Model = models[req.body.model]
  if(!Model) return next(createCustomError('Invalid data Model', 400))
  req.Model = Model
  next()
})