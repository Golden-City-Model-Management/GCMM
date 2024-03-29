
const mongoose = require('mongoose')
const Portfolio = require('./portfolio')
const CustomError = require('../utils/error')
const ImageSchema = require('./image')

const defaultImage = {
  asset_id: '',
  bytes: 0,
  created_at: new Date(Date.now()),
  etag: '',
  folder: '',
  format: '',
  height: 0,
  original_filename: '',
  placeholder: false,
  public_id: '',
  resource_type: '',
  secure_url: '',
  signature: '',
  version: 0,
  version_id: '',
  width: 0,
}

polaroidSchema = new mongoose.Schema({
  full_length: {
    type: ImageSchema,
    default: defaultImage
  },
  head_shot: {
    type: ImageSchema,
    default: defaultImage
  },
  half_length: {
    type: ImageSchema,
    default: defaultImage
  },
  side_profile: {
    type: ImageSchema,
    default: defaultImage
  },
})
const socialsSchema = new mongoose.Schema({
  instagram: {
    type: String,
    default: ''
  },
  facebook: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  },
  tiktok: {
    type: String,
    default: ''
  },
})
const modelSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'A model must have a first name!'],
    minLength: [3, 'The name must be at least 5 characters long!'],
    unique: [true, 'A model already exists with that first name!']
  },
  last_name: {
    type: String,
    required: [true, 'A model must have a last name!'],
    minLength: [3, 'The name must be at least 5 characters long!'],
    unique: [true, 'A model already exists with that last name!']
  },
  dob: {
    type: Date, 
    validate: {
      validator: function (val) {
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
    type: ImageSchema,
    required: [true, 'Please add a cover image!']
  },
  socials: {
    type: socialsSchema,
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
  polaroids: {
    type: polaroidSchema,
    default: { 
      full_length: defaultImage,
      half_length: defaultImage,
      head_shot: defaultImage,
      side_profile: defaultImage
    }
  },
  extra_polaroids: {
    type: [polaroidSchema],
    validate: [validateLength, 'No more than 2 extra sets polaroids are allowed!']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    default: ''
  },
  name: {
    type: String,
  },
  is_new_face: {
    type: Boolean,
    default: false
  },
  is_main_board: {
    type: Boolean,
    default: false,
  },
  eye_color: {
    type: String,
    default: 'black'
  },
  hair_color: {
    type: String, 
    default: 'black'
  }
},
  {
    toJSON: {
      virtuals: true,
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

modelSchema.virtual('portfolio', {
  ref: 'Portfolio',
  foreignField: 'model',
  localField: '_id'
})

modelSchema.virtual('age').get(function () {
  const birthYear = new Date(this.dob).getFullYear()
  const currentYear = new Date(Date.now()).getFullYear()
  return this.age = currentYear - birthYear
});
modelSchema.pre('findOne', function () {
  this.populate('portfolio')
})
modelSchema.pre('save', async function(next) {
  this.slug =  this.first_name.split(' ').join('-')  + '-' + this.last_name.split(' ').join('-')
  this.name =  this.first_name  + ' ' + this.last_name
  next()
})
modelSchema.pre('save', async function (next) {
  const Models = this.constructor
  const newModel = this
  const withName = await Models.find({ name: this.name, gender: this.gender })
  if (withName.length > 0 && withName.every(el => el.id !== newModel.id))
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
modelSchema.post(/.*Delete$/, async function (doc, next) {
  if (doc) {
    await Portfolio.deleteMany({ model: doc._id })
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
module.exports.polaroidSchema = polaroidSchema