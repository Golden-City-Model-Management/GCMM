
const { asyncHelper } = require('../utils/asyncUtils')
const { createCustomError } = require('../utils/controllerUtils')

module.exports.findDocument = (Model) => asyncHelper(async (req, res, next) => {
  const { name } = req.params
  const queryKeys = Object.keys(req.query)
  const queryObj = {}
  queryKeys.forEach(key => {
    queryObj[key] = req.query[key]
  })
  if(!name && queryKeys.length === 0) return next(createCustomError('Use id or make query by name.', 400))
  const doc = await (name !== 'undefined' ?  Model.findOne({ name: name }) : Model.findOne({...queryObj }))
  if (!doc) return next(createCustomError('No document found', 404))
  req.doc = doc
  next()
})