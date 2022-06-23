
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
   const { images: reqImages, model, image} = req.body
   if(!model) return next(createCustomError('Please specify the model this portfolio image belongs to', 400))
  
  const exists = await Model.findOne({_id: model})
  if (!exists) return next(createCustomError('Cannot add portfolio for a nonexistent model!', 404))
  if(!image && !reqImages) next(createCustomError('Please specify the image you want to add!', 400))
  if(reqImages  && image) next(createCustomError('Please specify either images or image!', 400))
  if(reqImages){
    if(!Array.isArray(reqImages)) return next(createCustomError('Please specify an array of images!', 400))
    const saved = []
    for(let i = 0; i < reqImages.length; i++){
      const newPortfolio = {model, image: reqImages[i]} 
      saved.push( createDocument(Portfolio, newPortfolio)(req, res, next))
    }
    if(saved.length !== reqImages.length)next(createCustomError('Unable to add all images!', 500))
    const images = await Promise.all(saved)
    // return createResponse(res, 201, {status: 'success', message: 'Successfully added portfolio images!', images})
    req.statusCode = 201
    req.status = 'success'
    req.message = 'Successfully added images'
    req.data ={images}
    next()
  }
  if(image){
    if(typeof(image) !== 'string') return next(createCustomError('Please specify a string for the image!', 400))
  const doc = await createDocument(Portfolio, req.body)(req, res, next)
  // return createResponse(res, 201, {status: 'success', message: 'Successfully added portfolio image!', doc})   
  req.statusCode = 201
  req.status = 'success'
  req.message = 'Image added sucessfully'
  req.data = {doc} 
  }
}) 
 
module.exports.deletePortfolio = asyncHelper(async(req,res,next) => {
  const { modelId } = req.params
  const model = await Model.findOne({_id: modelId})
  if(!model) {
    req.statusCode = 404
    req.status = 'failed'
    req.message = 'Model not found!'
    return next()
    // createResponse(res, 404, {status: 'error', message: 'Model not found!'
  // })
}
  await handleDocDelete(Portfolio, 'imageId')(req, res, next)
})

module.exports.getAllPortfolios = getAllDocuments(Portfolio)