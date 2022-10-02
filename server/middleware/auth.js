
const User = require('../models/user')
const CustomError = require('../utils/error')
const { asyncHelper } = require('../utils/async')
const { verifyJWT } = require('../utils/auth')

module.exports.checkSession = (fields) => asyncHelper( async(req, res, next) => {
  const access_token = req.cookies.access_token;
  const auth = req.headers.authorization
  if (!auth && !access_token)
  return next(new CustomError('Unauthorized!', 401))
  const token = access_token || auth.split(' ')[1]
  const verified = verifyJWT(token.replace(/"/g, ''))
  if (!verified) return next(new CustomError('Unauthorized!', 401))
  const user = await User.findById(verified.id).select(fields)
  if (!user) return next(new CustomError('Unauthorized!', 401))
  req.user = user
  req.status = 'success'
  req.statusCode = 200
  req.data = { is_logged_in: user !== undefined}
  next()
})

module.exports.protect = (fields) => this.checkSession(fields)

module.exports.restrict = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role))
      next(new CustomError('You are not authorized to perform this action', 403))
    else  next()
    }
}
module.exports.logout = (req, res) => {
  return res.clearCookie('access_token').status(200).json({message: 'Logout successful!'})
}