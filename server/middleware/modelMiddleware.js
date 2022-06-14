
const { asyncHelper } = require('../utils/asyncUtils')
const { createCustomError } = require('../utils/controllerUtils')
module.exports.handleNotFound = (Model) => asyncHelper(async (req, res, next) => {
  const model = await Model.findOne({ _id: req.params.id })
  if (!model) return next(createCustomError('No document with that id!', 404))
  req.doc = model
  next()
})