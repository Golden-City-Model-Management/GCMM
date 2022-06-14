
const mongoose = require('mongoose')


const portfolioSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: [true, 'Please specify the model this portfolio image belongs to!'],
  },  
  image: {
   type: String,
   required: [true, 'Please specify the path to the image!']
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Portfolio', portfolioSchema)