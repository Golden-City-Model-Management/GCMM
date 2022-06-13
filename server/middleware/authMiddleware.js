
const User = require('../models/userModel')
const CustomError = require('../utils/errorUtils')
const { asyncHelper } = require('../utils/asyncUtils')
const { verifyJWT } = require('../utils/authUtils')


module.exports.verifyClient = asyncHelper(async (req, res, next) => {
    const clientSecret = process.env.NODE_ENV === 'prod' ? process.env.CLIENT_SECRET : process.env.DEV_CLIENT_SECRET
    const token = req.headers['client-id'] || req.headers['client-secret']
console.log(token)
    if (!token) return next(new CustomError('Unauthorized!', 403))
    if(token !== clientSecret) next(new CustomError('Unauthorized!', 403))
    next()
})

module.exports.protect = (...fields) => (asyncHelper(async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth)
    return next(new CustomError('Unauthorized!', 401))
  const token = auth.split(' ')[1]
  const verified = verifyJWT(token)
  if (!verified) return next(new CustomError('Unauthorized!', 401))
  const user = await User.findById(verified.id).select(fields.join(' '))
  if (!user) return next(new CustomError('Unauthorized!', 401))
  req.user = user
  next()
}))

module.exports.restrict = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role))
      next(new CustomError('You are not authorized to perform this action', 403))
    else  next()
    }
 
}
