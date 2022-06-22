
const User = require('../models/userModel')
const { asyncHelper } = require('../utils/asyncUtils')
const {
  createMailOptions,
  createResponse,
  createCustomError,
  createDocument,
  getAllDocuments,
  editDocument,
  handleDocDelete,
  sendEmail,
} = require('../utils/controllerUtils') 

module.exports.createNewUser = asyncHelper(async (req, res, next) => {
  const newUserData = req.body
  const user = await createDocument(User, newUserData)(req, res, next)
  const mailOptions = createMailOptions('', user.email, 'Welcome to Golden City')
  const links = { login: `http://localhost:1298/api/v1/users/login`}
  const options = {user: newUserData, links}
  const emailSent = await sendEmail(mailOptions, 'newUser', options, {})
  if (emailSent.response === 'success') {
    return createResponse(res, 201, 'success', 'User created successfully', user)
  } else {
    await User.findOneAndDelete({
      email
    })
    return next(createCustomError('Unable to create user. Please try again', 500))
  }
})
module.exports.handleDelete = asyncHelper(handleDocDelete(User, 'id'))
module.exports.getAllUsers = getAllDocuments(User)

// CRUD Operations for users above

/*
 * 
 * 
\\\\\\\\\\\\\\\\\\**************\\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\**************\\\\\\\\\\\\\\\\\
*
*
*/

// Authentication and verification Logic below

module.exports.loginUser = asyncHelper(async (req, res, next) => {
  const {
    userName,
    password
  } = req.body
  if (!password || !userName) {
    return next(createCustomError('Please specify all required fields', 400))
  }
  const user =  await User.findOne({$or:[{userName: userName}, {email: userName}]}).select('+isVerified +password') 
  if (!user) {
    return next(createCustomError('Invalid credentials', 401))
  }
  if (!user.isVerified) {
   const emailSent = await sendEmailConfirmation(user, user.email) 
    if (emailSent.response === 'failed') return next(createCustomError('Please try again later', 500))
    return next(createCustomError('Please verify your account. Check your email for a verification link.', 400))
  }
  const isMatch = await user.compareKey('password', password)
  if (!isMatch) {
    return next(createCustomError('Invalid credentials', 401))
  }
  isMatch.password = undefined
  isMatch.isVerified = undefined
  return res.status(200).json({
    status: 'success',
    data: {
      token: await user.generateAuthToken(),
      user: isMatch
    }
  })
})

module.exports.verifyUser = asyncHelper(async (req, res, next) => {
  const { token, id } = req.query
  if (!token) return next(createCustomError('Unauthorized', 403))
  const user = await User.findOne({ _id: id })
  if (!user) return next(createCustomError('Cannot verify non-existent user!', 404))
  if (!user.emailConfirmationToken) return next(createCustomError('Unauthorized', 403))
  const isMatch = user.compareKey('emailConfirmationToken', token)
  if (!isMatch) return next(createCustomError('Invalid token', 403))
  user.emailConfirmationToken = undefined
  user.isVerified = true
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to verify email', 500))
  return createResponse(res, 200, 'success', 'Email verified successfully')
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
  const passwordResetToken = user.generateToken('passwordResetToken')
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000
  await user.hashKeys('passwordResetToken')
  const mailOptions = createMailOptions('', email, 'Password Reset Request')
  const links = {
    resetPassword: `http://localhost:1298/api/v1/users/password-reset/${passwordResetToken}/${user._id}`
  }
  const options = {links, user}
  const emailSent = await sendEmail(mailOptions, 'passwordReset', options, {}) 
  if (emailSent.response === 'success') {
    const saved = await user.save({ validateBeforeSave: false })
    if (!saved) return next(createCustomError('Unable to reset your password. Please try again later!', 500))
    return createResponse(res, 200, 'success', 'A Password Reset link has been sent to your email.')
  } else {
    return next(createCustomError('Unable to reset password. Please try again', 500))
  }
})

module.exports.passwordReset = asyncHelper(async (req, res, next) => {
  const { token, id } = req.params
  const user = await User.findOne({ _id: id})
  if (!user) return next(createCustomError('Unauthorized!', 401))
  if (!user.passwordResetToken) return next(createCustomError('Token expired or invalid!', 401))
  const isMatch = await user.compareKey('passwordResetToken', token)
  if (!isMatch) return next(createCustomError('Invalid Reset Token', 401))
  const timeElapsed =
    new Date(user.passwordResetExpires).getTime() < Date.now()
  if (timeElapsed) return next(createCustomError('Reset Token Expired! Please try again', 401))
  const newPassword = req.body.password
  if (!newPassword) return next(createCustomError('Please provide your new password', 400))
  user.password = newPassword
  await user.hashKeys('password')
  user.passwordResetExpires = undefined
  user.passwordResetToken = undefined
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to reset your password. Please try again', 500))
  return createResponse(res, 200, 'success', 'Your password has successfully been reset')
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
  await user.hashKeys('password')
  const saved = await user.save()
  if (!saved) return next(createCustomError('Unable to change your password! Please try again later', 500))
  return createResponse(res, 203, 'success', 'Password changed successfully!')
})

module.exports.changeEmail = asyncHelper(async (req, res, next) => {
  const user = req.user
  const { newEmail } = req.body
  if (!newEmail) return next(createCustomError('Please provide a new email', 400))
  const emailSent = await sendEmailConfirmation(user, newEmail)
  if (emailSent.response === 'success') {
    user.email = newEmail
    user.isVerified = false
    const saved = await user.save()
    if (!saved) return next(createCustomError('Unable to update email! Please try again', 500))
    return createResponse(res, 203, 'success', 'Please check your new email for a verification link')
  } else return next(createCustomError('Unable to update your email! Please try again later!', 500))
})

module.exports.editProfile = asyncHelper(async (req, res, next) => {
  const user = req.user
  const excludedFields = ['password', 'email', 'role']
  editDocument(excludedFields, user)(req, res, next) 
})

const sendEmailConfirmation  = async (user, email) => {
  const token = user.generateToken('emailConfirmationToken')
    await user.hashKeys('emailConfirmationToken')
    user.email = email
    await user.save()
    const confirmEmail = `/api/v1/users/verify?token=${token}&id=${user._id}`
    const mailOptions = createMailOptions('', email, 'Email Confirmation')
    const options = {user, links: {confirmEmail}}
    const emailSent = await sendEmail(mailOptions, 'confirmEmail', options, {})
    return emailSent
}