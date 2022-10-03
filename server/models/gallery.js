const mongoose = require('mongoose')
const ImageSchema = require('./image')

const galleryImage = ImageSchema

module.exports = mongoose.model('GalleryImage', galleryImage, 'gallery' )