
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
  // return createResponse(res, 201, {status: 'success', message: 'Model added successfully', model})
  req.statusCode = 201
  req.status = 'success' 
  req.message = 'Successfully created model'
  req.data = { model }
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
  // return createResponse(res, 200, {status: 'success', message: 'Model found', model})
  req.statusCode = 201 
  req.status = 'success' 
  req.message = 'Model found'
  req.data = { model }
})

module.exports.getAllModels = getAllDocuments(Model)




