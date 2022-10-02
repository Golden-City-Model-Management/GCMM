
const mongoose = require('mongoose')


const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name to enable us serve you better.'],
    minLength: [3, 'Your name must be at least 3 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email to enable us serve you better.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide your message to enable us serve you better.'],
    minLength: [10, 'Your message must be at least 10 characters long.'],
  }
})

module.exports = mongoose.model('Feedback', FeedbackSchema)

