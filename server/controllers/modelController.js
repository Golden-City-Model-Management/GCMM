
const Model = require('../models/modelModel');
const { asyncHelper } = require('../utils/asyncUtils')
const {
  handleDocDelete,  
  createCustomError,
  getAllDocuments, 
} = require('../utils/controllerUtils')

module.exports.createNewModel = asyncHelper(async (req, res, next) => {
  const model = await req.savedDoc
  req.statusCode = 201
  req.status = 'success' 
  req.message = 'Successfully created model'
  req.data = { model }
  return next()
})
module.exports.editModelProfile = asyncHelper(async (req, res, next) => {
  let model = await Model.findById(req.params.id)
  if(req.body.polaroids){
    Object.keys(req.body.polaroids).forEach(pol => {
      if(req.body.polaroids[pol]){
        model.polaroids[pol] = req.body.polaroids[pol]
      }
    })
  }
  if(req.body.extra_polaroids && req.body.extra_polaroids.length > 0){
      let toUpdate
      model.extra_polaroids.forEach(extra => {
        toUpdate = req.body.extra_polaroids.find(el => el._id === extra._id.toString())
        if(toUpdate){
          Object.keys(toUpdate).map(el => {
            extra[el] = toUpdate[el]
          })
        }
      })
      req.body.extra_polaroids.filter(item => item._id === undefined).forEach(el => {
        model.extra_polaroids.push(el)
      }) 
   }
  Object.keys(req.body).forEach(key => {
    if(key !== 'polaroids' && key !== 'extra_polaroids'){
      model[key] = req.body[key]
    }
  })
  const saved = await model.save()
  if (!saved) { return next(createCustomError('Unable to update profile! Please try again later', 500)) }
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Successfully updated!'
  req.data = { doc: saved }
  next()
}) 
module.exports.handleDelete =  handleDocDelete(Model, 'id')

module.exports.getModel = asyncHelper(async (req, res, next) => {
  const model = req.doc
  req.statusCode = 200
  req.status = 'success' 
  req.message = 'Model found'
  req.data = { model }
  return next()
})

module.exports.getAllModels = getAllDocuments(Model)




