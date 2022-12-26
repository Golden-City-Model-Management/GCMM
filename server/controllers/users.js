
const User = require('../models/user')
const { asyncHelper } = require('../utils/async')
const {
  createMailOptions,
  createCustomError,
  getAllDocuments,
  editFields,
  sendEmail,
} = require('../utils/controller') 

module.exports.createNewUser = asyncHelper(async (req, _res, next) => {
  const user = await req.savedDoc
  const mailOptions = createMailOptions('', user.email, 'Welcome to Golden City')
  const links = { login: `${process.env.ADMIN_FRONTEND}/login`}
  const options = {user: user, links}
  const emailSent = await sendEmail(mailOptions, 'newUser', options, {})
  if (emailSent.response === 'success') {
    req.statusCode = 201
    req.status = 'success'
    req.message = 'User successfully created'
    req.data = {user}
    return next()
  } else {
    await User.findOneAndDelete({
      email
    })
    return next(createCustomError('Unable to create user. Please try again', 500))
  }
})

module.exports.getAllUsers = getAllDocuments(User)

module.exports.loginUser = asyncHelper(async (req, res, next) => {
  const {
    user_name,
    password
  } = req.body
  if (!password || !user_name) {
    return next(createCustomError('Please specify all required fields', 400))
  }
  const user =  await User.findOne({$or:[{user_name: user_name}, {email: user_name}]}).select('+isVerified +password') 
  if (!user) {
    return next(createCustomError('Invalid credentials', 401))
  }
  if (!user.isVerified) {
   const emailSent = await sendEmailConfirmation(user, user.email) 
    if (emailSent.response === 'failed') return next(createCustomError('Please try again later', 500))
    return next(createCustomError('Please verify your account. Check your email for a verification link.', 400))
  }
  const isMatch = await user.compareKey('password', password)
  console.log(isMatch, password)
  if (!isMatch) {
    return next(createCustomError('Invalid credentials', 401))
  }
  isMatch.password = undefined
  isMatch.isVerified = undefined
  isMatch.password_reset_expires = undefined
  isMatch.password_reset_token = undefined

  const token = await user.generateAuthToken()
  const cookieOptions = {
    expires: (new Date(Date.now()+ 86400 * 2000)),
    httpOnly: true, 
    secure: (req.secure || req.headers['x-forwarded-proto'] === 'https')
    }
  res.cookie("access_token", token, cookieOptions )
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Login successful'
  req.data = {user: isMatch, token}
  next()
})

module.exports.verifyUser = asyncHelper(async (req, res, next) => {
  const { token, id } = req.query
  if (!token || !id) return next(createCustomError('Unauthorized', 403))
  const user = await User.findOne({ _id: id })
  if (!user) return next(createCustomError('Cannot verify non-existent user!', 404))
  if (!user.email_confirmation_token) return next(createCustomError('Unauthorized', 403))
  const isMatch = user.compareKey('email_confirmation_token', token)
  if (!isMatch) return next(createCustomError('Invalid token', 403))
  user.email_confirmation_token = undefined
  user.isVerified = true
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to verify email', 500))
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Email verified successfully'
  next()
})

module.exports.forgotPassword = asyncHelper(async (req, res, next) => {
  const {
    email
  } = req.body
  if (!email)
    return next(createCustomError('Please provide an email!', 401))
  const user = await User.findOne({
    email
  })
  if (!user)
    return next(createCustomError('No user with that email', 401))
  const password_reset_token = user.generateToken('password_reset_token')
  user.password_reset_expires = Date.now() + 10 * 60 * 1000
  await user.hashKeys('password_reset_token')
  const mailOptions = createMailOptions('', email, 'Password Reset Request')
  const links = {
    resetPassword: `${process.env.ADMIN_FRONTEND}/admin/password-reset?prt=${password_reset_token}&uid=${user._id}`
  }
  const options = {links, user}
  const emailSent = await sendEmail(mailOptions, 'passwordReset', options, {}) 
  if (emailSent.response === 'success') {
    const saved = await user.save({ validateBeforeSave: false })
    if (!saved) return next(createCustomError('Unable to reset your password. Please try again later!', 500))
    req.statusCode = 200
    req.status = 'success'
    req.message = 'A Password Reset link has been sent to your email.'
    next()
  } else {
    return next(createCustomError('Unable to reset password. Please try again', 500))
  }
})

module.exports.passwordReset = asyncHelper(async (req, res, next) => {
  const { token, id } = req.params
  const user = await User.findOne({ _id: id})
  if (!user) return next(createCustomError('Unauthorized!', 401))
  if (!user.password_reset_token) return next(createCustomError('Token expired or invalid!', 401))
  const isMatch = await user.compareKey('password_reset_token', token)
  if (!isMatch) return next(createCustomError('Invalid Reset Token', 401))
  const timeElapsed =
    new Date(user.password_reset_expires).getTime() < Date.now()
  if (timeElapsed) return next(createCustomError('Reset Token Expired! Please try again', 401))
  const newPassword = req.body.password
  if (!newPassword) return next(createCustomError('Please provide your new password', 400))
  user.password = newPassword
  user.password_reset_expires = undefined
  user.password_reset_token = undefined
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to reset your password. Please try again', 500))
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Your password has successfully been reset.'
  next()
})

module.exports.changePassword = asyncHelper(async (req, res, next) => {
  const user = req.user
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) return next(createCustomError('All fields are required', 401))
  const isMatch = await user.compareKey('password', oldPassword)
  const isSameAsOldPassword = await user.compareKey('password', newPassword)
  if (!isMatch) return next(createCustomError('Old password not matched', 403))
  if (isSameAsOldPassword) return next(createCustomError('Your new password must be different from your old password!', 400))
  user.password = newPassword
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to change your password! Please try again later', 500))
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Password changed successfully.'
  next()
})

module.exports.changeEmail = asyncHelper(async (req, res, next) => {
  const user = req.user
  const { newEmail } = req.body
  if (!newEmail) return next(createCustomError('Please provide a new email', 400))

  if(newEmail.toLowerCase() === user.email.toLowerCase()) return ( 
    next(createCustomError('Your new email must be different from your current email', 400)))

  const alreadyExistsWithEmail = await User.find({email: newEmail})[0]
  if (alreadyExistsWithEmail) return next(createCustomError('An account already exists with that email', 400))
  const emailSent = await sendEmailConfirmation(user, newEmail)
  if (emailSent.response === 'success') {
    user.email = newEmail
    user.isVerified = false
    const saved = await user.save()
    if (!saved) return next(createCustomError('Unable to update email! Please try again', 500))
    req.statusCode = 200
    req.status = 'success'
    req.message = 'A verification link has been sent to your email.'
    next()
  } else return next(createCustomError('Unable to update your email! Please try again later!', 500))
})

module.exports.getUser = asyncHelper(async (req, res, next) => {
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Profile fetched successfully'
  req.data = { user: req.user }
  next()
})

module.exports.editProfile = asyncHelper(async (req, res, next) => {
  const user = req.user
  const excludedFields = ['password', 'email', 'role']
  const fieldsToChange = Object.keys(req.body)
  for (field of excludedFields) {
    if (req.body[field]) return next(createCustomError('Not allowed to perform that action!', 403))
  }
  editFields(user, fieldsToChange, req.body)
  const saved = await user.save()
  if (!saved) { return next(createCustomError('Unable to update profile! Please try again later', 500)) }
  req.statusCode = 200
  req.status = 'success'
  req.message = 'Successfully updated!'
  req.data = { doc: saved }
  return next()
})

const sendEmailConfirmation  = async (user, email) => {
  const token = user.generateToken('email_confirmation_token')
    await user.hashKeys('email_confirmation_token')
    user.email = email
    await user.save()
    const confirmEmail = `/api/v1/users/verify?token=${token}&id=${user._id}`
    const mailOptions = createMailOptions('', email, 'Email Confirmation')
    const options = {user, links: {confirmEmail}}
    const emailSent = await sendEmail(mailOptions, 'confirmEmail', options, {})
    return emailSent
}