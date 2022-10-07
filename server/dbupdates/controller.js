
const { asyncHelper } = require('../utils/async')
const { createCustomError } = require('../utils/controller')

module.exports.renameFields = asyncHelper(async (req, res, next) => {
  const renames = req.body.renames
  if(!renames ||  Array.isArray(renames)){
    return next(createCustomError('Please specify a dictionary with key value pairs to rename fields!', 400))
  }
  const formattedRenames = Object.keys(renames).map(oldName => {
    return {[oldName]: renames[oldName]}
  })
  let renameObj = {}
  formattedRenames.forEach(rename => {
    renameObj = { ...renameObj, ...rename }
  })
  const Model = req.Model
  const data = await Model.updateMany({}, { $rename: { ...renameObj,}}, { strict: false, })
  const { acknowledged } = data
  console.log({ acknowledged, data })
  req.status = acknowledged ? 'success' : 'failed'
  req.message = acknowledged ? 'Successfully renamed fields!' : 'Unable to rename fields!'
  req.statusCode = acknowledged ? 200 : 304
  req.data = {acknowledged}
  next()
})

module.exports.unsetFields = asyncHelper(async (req, res, next) => {
  const unsets = req.body.unsets
  if(!Array.isArray(unsets)) return next(createCustomError('Please specify an array of fields you want to unset!', 400))
  let formattedUnsets = {}
  unsets.forEach(unset => {
    formattedUnsets[unset] = ''
  })
  const Model = req.Model
  const data = await Model.updateMany({}, { $unset: { ...formattedUnsets,}}, { strict: false, })
  const { acknowledged } = data
  console.log({ acknowledged, data })
  req.status = acknowledged ? 'success' : 'failed'
  req.message = acknowledged ? 'Successfully unset fields!' : 'Unable to unset fields!'
  req.statusCode = acknowledged ? 200 : 304
  req.data = {acknowledged}
  next()
})