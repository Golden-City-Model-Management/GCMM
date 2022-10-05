

const ModelApplication = require('../models/modelApplication')
const { getAllDocuments } = require('../utils/controller')
const { asyncHelper } = require('../utils/async')

module.exports.getAllApplications = getAllDocuments(ModelApplication)

module.exports.createNewApplication = asyncHelper(async (req, res, next) => {
  const application = await req.savedDoc
  req.status = 'success'
  req.statusCode = 201
  req.data = { application }
  req.message = 'Application sent successfully!'
  next()
})