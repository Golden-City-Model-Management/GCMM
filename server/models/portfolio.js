
const mongoose = require('mongoose')
const ImageSchema = require('./image')

const portfolioSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: [true, 'Please specify the model this portfolio image belongs to!'],
  }, 
  model_slug: {
    type: String,
    ref: 'Model',
    required: [true, 'Please specify the model slug!']
  }, 
  image: {
   type: ImageSchema,
   required: [true, 'Please specify the path to the image!']
  },
},{
  timestammps: true,
})

module.exports = mongoose.model('Portfolio', portfolioSchema)