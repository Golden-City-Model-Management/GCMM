
const Model = require('../models/modelModel');
const { asyncHelper } = require('../utils/asyncUtils')
const {
  editFields,
  editDocument,
  handleDocDelete,  
  createCustomError,
  createDocument,
  getAllDocuments, 
} = require('../utils/controllerUtils')

module.exports.createNewModel = asyncHelper(async (req, res, next) => {
  const newModel = createDocument(Model, req.body)
  const model = await newModel(req, res, next)
  req.statusCode = 201
  req.status = 'success' 
  req.message = 'Successfully created model'
  req.data = { model }
  return next()
})
module.exports.editModelProfile = asyncHelper(async (req, res, next) => {
  const model = req.doc
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
  const model = req.doc
  req.statusCode = 201 
  req.status = 'success' 
  req.message = 'Model found'
  req.data = { model }
  return next()
})

module.exports.getAllModels = getAllDocuments(Model)




