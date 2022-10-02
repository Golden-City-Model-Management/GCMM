const mongoose = require('mongoose')
const ImageSchema = require('./image')

const galleryImage = new mongoose.Schema({
  type: ImageSchema,
})

module.exports = mongoose.model('GalleryImage', galleryImage, 'gallery' )