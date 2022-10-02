
const GalleryImage = require('../models/gallery')
const { asyncHelper } = require('../utils/async')
const { createCustomError } = require('../utils/controller')

module.exports.addImages = asyncHelper(async (req, res, next) => {
  const images = req.body.images
  console.log(images)
  if(!images || !Array.isArray(images) || images.length <= 0 ) return next(createCustomError('Please provide a list of images to add to the gallery!', 400))
  const docs = []
  for(const image of images){
    docs.push(new GalleryImage(image))
  }
  const savedDocs = await Promise.all(docs)
  req.statusCode = 201
  req.status = 'success'
  req.data = { images: savedDocs }
  next()
})