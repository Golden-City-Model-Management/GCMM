

const mongoose = require('mongoose')
const { polaroidSchema } = require('./model') 

const ModelApplicationSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide a first name'],
    minlength: [3, 'Your first name should be at least three characters long']
  },
  last_name: {
    type: String,
    required: [true, 'Please provide your last name!'],
    minlength: [3, 'Your last name should be at least three characters long!']
  }, 
  email: {
    type: String,
    required: [true, 'Please provide an email address!'],
  },
  phone: {
    type: String, 
    required: [true, 'Please provide a telephone number!']
  },
  dob: {
    type: Date,
    required: [true, 'Please provide your date of birth!'],
    validate: {
      validator: function (val) {
        return Object.prototype.toString.call(val) === "[object Date]"
      }
    }
  },
  polaroids: {
    type: polaroidSchema,
    required: [true, 'polaroids cannot be empty!'],
  },
  gender: {
    type: String, 
    required: [true, 'The gender field cannot be empty!']
  },
  height: {
    type: Number,
    required: [true, 'The height field cannot be empty!']
  },
  bust: {
    type: Number
  },
  chest: {
    type: Number
  },
  hips: {
    type: Number,
    required: [true, 'The hips field cannot be empty!']
  },
  waist: {
    type: Number,
    required: [true, 'The waist field cannot be empty!']
  },
  shoe: {
    type: Number,
    required: [true, 'The shoe field cannot be empty!']
  },
  country: {
    type: String, 
    required: [true, 'Please specify your country!'],
    minlength: [3, 'Your country must be at least three characters long!']
  },
  city: {
    type: String,
    required: [true, 'Please specify your city!'],
    minlength: [3, 'Your city must be at least three characters long!']
  },
  hair_color: {
    type: String,
  },
  instagram: String,
  age: Number,
})

module.exports = mongoose.model('Application', ModelApplicationSchema)