
const mongoose = require('mongoose')
const { signToken, bcryptEncrypt, comparePlainAndHashed } = require('../utils/auth')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please specify a name!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists!'],
    trim: true,
  },  
  email: {
    type: String,
    required: [true, 'Please specify an email!'],
    unique: [true, 'Email already exists!'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  role: {
    type: String,
    required: [true, 'Please specify a role'],
    enum: ['admin', 'manager', 'scout']
  },
  avatar:{
    type: String,
    default: 'https://res.cloudinary.com/dzqbzqjqw/image/upload/v1587010900/avatar_default_qjqjqj.png'
  },
  emailConfirmationToken: {
    type: String
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: true,
    select: false
  }, 
},
{
  timestammps: true,
}
)
userSchema.pre('save', async function(next){ 
  if(!this.isModified('password')) return next()
  await this.hashKeys('password')
  next()
})
userSchema.methods.generateToken = function(key) {
  const token = crypto.randomBytes(32).toString('hex')
  this[key] = token
  return token
}
userSchema.methods.generateAuthToken = function () {
  return signToken(this._id)
}
userSchema.methods.hashKeys = async function (...keys) {
  for (const key of keys) {
    this[key] = await bcryptEncrypt(this[key])
  }
}
userSchema.methods.compareKey = async function (key, value) {
  const isMatch = await comparePlainAndHashed({plain: value, hashed: this[key]})
  if (isMatch) {
    return this
  } else {
    return isMatch
  }
}

module.exports = mongoose.model('User', userSchema)