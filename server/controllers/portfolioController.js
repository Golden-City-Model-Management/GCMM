
const Portfolio = require('../models/portfolioModel')
const Model = require('../models/modelModel')
const Gallery = require('../models/gallery')
const {asyncHelper} = require('../utils/asyncUtils')
const { 
  getAllDocuments,
  handleDocDelete,
  createDocument,
  createCustomError,
} = require('../utils/controllerUtils')

module.exports.addPortfolio = asyncHelper(async (req, res, next) => {
   const { images: reqImages, model} = req.body
   if(!model) return next(createCustomError('Please specify the model this portfolio image belongs to', 400))
  
  const exists = await Model.findOne({_id: model})
  if (!exists) return next(createCustomError('Cannot add portfolio for a nonexistent model!', 404))
  if(!reqImages) next(createCustomError('Please specify an array of images you want to add!', 400))
  if(!Array.isArray(reqImages)) return next(createCustomError('Please specify an array of images!', 400))
    const saved = []
    for(let i = 0; i < reqImages.length; i++){
      const newPortfolio = {model, image: reqImages[i]} 
      saved.push( createDocument(Portfolio, newPortfolio)(req, res, next))
    }
    if(saved.length !== reqImages.length)next(createCustomError('Unable to add all images!', 500))
    const images = await Promise.all(saved)
    req.statusCode = 201
    req.status = 'success'
    req.message = 'Successfully added images'
    req.data ={images}
    next()
}) 

module.exports.deletePortfolio = asyncHelper(async(req,res,next) => {
  const { modelId } = req.params
  const model = await Model.findOne({_id: modelId})
  if(!model) {
    req.statusCode = 404
    req.status = 'failed'
    req.message = 'Model not found!'
    return next()
}
  await handleDocDelete(Portfolio, 'imageId')(req, res, next)
})
module.exports.getModelPortfolio = asyncHelper(async (req, res, next) => {
  const docs = await Portfolio.find({model: req.params.modelId})
  if(docs.length === 0){
    req.message = 'No documents were found that match your search.'
  }else{
    req.message = 'Documents successfuly fetched.'
    req.data.total_count = docs.length
  }
  req.data = {...req.data, docs}
  req.statusCode = 200
  req.data = { docs }
  req.statusCode = 200
  req.status = 'success'
  next()
})
module.exports.getAllPortfolios = getAllDocuments(Portfolio)