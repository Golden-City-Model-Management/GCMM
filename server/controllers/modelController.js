
const Model = require('../models/modelModel');
const { asyncHelper } = require('../utils/asyncUtils')
const {
  editFields,
  editDocument,
  handleDocDelete,  
  createResponse,
  createCustomError,
  createDocument,
  getAllDocuments, 
} = require('../utils/controllerUtils')

module.exports.createNewModel = asyncHelper(async (req, res, next) => {
  const model = await createDocument(Model, req.body)(req, res, next)
  return createResponse(res, 201, 'success', 'Model added successfully', model)
})
module.exports.editModelProfile = asyncHelper(async (req, res, next) => {
  const model = await Model.findOne({ _id: req.params.id })
  if (!model) return next(createCustomError('No model with that id!', 404))
  if(req.body.polaroids){
    const fields = Object.keys(req.body.polaroids)
    model.polaroids = editFields(model.polaroids, fields, req.body.polaroids)
  }
   delete req.body.polaroids 
   await model.save()
  editDocument([], model)(req, res, next)
}) 
module.exports.handleDelete =  handleDocDelete(Model, 'id')

module.exports.getModel = asyncHelper(async (req, res, next) => {
  const { id } = req.params
  const model = await Model.findOne({id})
  if (!model) return next(createCustomError('No model with that id!', 404))
  return createResponse(res, 200, 'success', 'Model found', model)
})

module.exports.getAllModels = getAllDocuments(Model)




