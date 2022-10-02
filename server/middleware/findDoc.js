
const { asyncHelper } = require('../utils/async')
const { createCustomError } = require('../utils/controller')

module.exports.findDocBySlugOrName = (Model) => asyncHelper(async (req, _res, next) => {
  const params = req.params
  if(!params.slug) return next(createCustomError('Invalid query!', 400))
  const doc = await Model.find({ $or : [ { slug : params.slug }, { name : params.slug } ] })
  if (!doc) return next(createCustomError('No document found', 404))
  req.doc = doc
  next()
})

module.exports.findByIdParam = (Model) => asyncHelper(async (req, _res, next) => {
  const params = req.params
  if(!params.id) return next(createCustomError('Please provide the id!', 400))
  const doc = await Model.findById(params.id)
  if (!doc) return next(createCustomError('No document found', 404))
  req.doc = doc
  next()
})