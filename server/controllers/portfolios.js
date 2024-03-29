
const { isObjectIdOrHexString } = require('mongoose')
const Portfolio = require('../models/portfolio')
const Model = require('../models/model')
const {asyncHelper} = require('../utils/async')
const { 
  getAllDocuments,
  createDocument,
  createCustomError,
} = require('../utils/controller')

module.exports.addPortfolio = asyncHelper(async (req, res, next) => {
   const { images: reqImages, model} = req.body
   if(!model) return next(createCustomError('Please specify the model this portfolio image belongs to', 400))
  
  const exists = await Model.findOne({_id: model})
  if (!exists) return next(createCustomError('Cannot add portfolio for a nonexistent model!', 404))
  if(!reqImages) next(createCustomError('Please specify an array of images you want to add!', 400))
  if(!Array.isArray(reqImages)) return next(createCustomError('Please specify an array of images!', 400))
    const saved = []
    for(let i = 0; i < reqImages.length; i++){
      const newPortfolio = {model, model_slug: exists.slug, image: reqImages[i]} 
      saved.push(await createDocument(Portfolio, newPortfolio))
    }
    if(saved.length !== reqImages.length)next(createCustomError('Unable to add all images!', 500))
    const images = await Promise.all(saved)
    req.statusCode = 201
    req.status = 'success'
    req.message = 'Successfully added images'
    req.data ={images}
    next()
}) 

module.exports.getModelPortfolio = asyncHelper(async (req, _res, next) => {
  const isModelId = isObjectIdOrHexString(req.params.model)
  let docs
  if(isModelId){
    docs = await Portfolio.find({ model: req.params.model })
  }else{
    docs = await Portfolio.find({model_slug: req.params.model})
  }
  if(docs.length === 0){
    req.message = 'No documents were found that match your search.'
  }else{
    req.message = 'Documents successfuly fetched.'
    req.data = { ...req.data, total_count: docs.length}
  }
  req.data = {...req.data, docs}
  req.statusCode = 200
  req.status = 'success'
  next()
})

module.exports.getAllPortfolios = getAllDocuments(Portfolio)