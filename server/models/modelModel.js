
const mongoose = require('mongoose')
const Portfolio = require('../models/portfolioModel')
const CustomError = require('../utils/errorUtils')

const polaroidSchema = new mongoose.Schema({
  full_length: {
    type: String,
    default: '',
  },
  waist_up: {
    type: String,
    default: '',
  },
  close_up: {
    type: String,
    default: '',
  },
  profile: {
    type: String,
    default: '',
  },
})
const socialsSchema = new mongoose.Schema({
  instagram: String,
  facebook: String,
  twitter: String,
  tiktok: String,
})
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A model must have a name!'],
    minLength: [3, 'The name must be at least 5 characters long!'],
  },
  dob: {
    type: Date,
    validate: {
      validator:  function(val){
        return Object.prototype.toString.call(val) === "[object Date]"
      }
    },
    required: [true, 'Please specify the dob field!'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Please specify the gender.']
  },
  cover_image: {
    type: String,
    required: [true, 'Please add a cover image!']
  },
  socials: {
    type: socialsSchema,
    required: [true, 'Pleae provide the model\'s social media handles']
  },
  bust: Number,
  hips: Number, 
  waist: {
    type: Number,
    required: [true, 'Please specify the waist']
  },
  chest: Number,
  height: {
    type: Number,
    required: [true, 'Please specify the height']
  },
  shoe: {
    type: Number,
    required: [true, 'Please specify the shoe size']
  },
  polaroids: polaroidSchema, 
  extra_polaroids: {
    type: [polaroidSchema],
    validate: [validateLength, 'No more than 2 extra sets polaroids are allowed!']
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
  {
    toJSON: { virtuals: true ,
      transform: (_, ret) => {  
        delete ret.__v
        delete ret._id
        return ret
      }
      },
    toObject: { virtuals: true },
    timestammps: true,
  }
  )

function validateLength(val) {
  return val.length <= 2
}

modelSchema.virtual('portfolio',{
  ref: 'Portfolio',
  foreignField: 'model',
  localField: '_id'
})
modelSchema.pre('findOne', function(){
  this.populate('portfolio')
})
modelSchema.pre('save', async function (next) {
  const Models = this.constructor
  const newModel = this
  const withName = await Models.find({name: this.name, gender: this.gender})
  if(withName.length > 0 && withName.every(el => el.id !== newModel.id)) 
    return next(new CustomError(`A ${this.gender}
     model already exists with the name ${this.name},
      please try again with another name!`, 401))
  const femaleOnly = ['bust', 'hips']
  const maleOnly = ['chest']
  if (newModel.gender === 'female') {
    return newModel.checkFields(femaleOnly)(next)
  } else if (newModel.gender === 'male') {
    return newModel.checkFields(maleOnly)(next)
  }
  return next()
})
modelSchema.post( /.*Delete$/, async function(doc, next){
  if(doc){
    await Portfolio.deleteMany({model: doc._id})
  }
  next()
})
modelSchema.methods.checkFields = function (fields) {
  return (next) => {
    for (el of fields) {
      if (!this[el]) return next(new CustomError('All fields are required!', 401))
    }
    return next()
  }
}

module.exports = mongoose.model('Model', modelSchema) // Model is the name of the collection')
