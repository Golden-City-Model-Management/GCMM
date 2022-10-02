
const { asyncHelper } = require('../utils/async')
const { createCustomError } = require('../utils/controller')

module.exports.deleteByIdParam = Model => asyncHelper( async (req, res, next) => {
  const params = req.params
  if(!params.id) return next(createCustomError('Please specify the id of the document to delete!', 400))
  await Model.findByIdAndDelete(params.id)
  req.statusCode = 204
  next()
})