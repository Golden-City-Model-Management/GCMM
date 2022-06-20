
const { asyncHelper } = require('../utils/asyncUtils')
const { createCustomError } = require('../utils/controllerUtils')
module.exports.handleNotFound = (Model) => asyncHelper(async (req, res, next) => {
  const { id } = req.params.id
  const model = await Model.findOne({ id: id })
  if (!model) return next(createCustomError('No document with that id!', 404))
  req.doc = model
  next()
})