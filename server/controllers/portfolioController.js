
const Portfolio = require('../models/portfolioModel')
const Model = require('../models/modelModel')
const {asyncHelper} = require('../utils/asyncUtils')
const { 
  getAllDocuments,
  handleDocDelete,
  createDocument,
  createResponse,
  createCustomError,
} = require('../utils/controllerUtils')

module.exports.addPortfolio = asyncHelper(async (req, res, next) => {
  console.log(req.files, req.body)
  const model = await Model.findOne({_id: req.body.model})
  if (!model) return next(createCustomError('Cannot add portfolio for a nonexistent model!', 404))
  const doc = await createDocument(Portfolio, req.body)(req, res, next)
  return createResponse(res, 201, 'success', 'Successfully added portfolio image!', doc)
}) 
 
module.exports.deletePortfolio = asyncHelper(async(req,res,next) => {
  const { modelId } = req.params
  const model = await Model.findOne({_id: modelId})
  if(!model) return res.status(400).json({
    status: 'failed',
    message: 'Not Allowed'
  })
  await handleDocDelete(Portfolio, 'imageId')(req, res, next)
})

module.exports.getAllPortfolios = getAllDocuments(Portfolio)