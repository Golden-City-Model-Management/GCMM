

const User = require('../models/userModel')
const { noArgsAsyncHelper } = require('../utils/asyncUtils')
const { createMailOptions, sendEmail } = require('../utils/controllerUtils')

const getAllAdministrators = async (select) => {

  const admins = await User.find({ role: 'admin' }).select(select)
  return admins

}

const notifyAdminsOfFeedback = noArgsAsyncHelper(async () => {
  const admins = await getAllAdministrators('+name +email -role -avatar -userName -__v -createdAt -_id -emailConfirmationToken -passwordResetExpires -passwordResetToken')
  await Promise.all(admins.map((admin) => {
    const mailOptions = createMailOptions('', admin.email, 'A new feedback has been submitted')
    const options = {
      user: admin,
      links: {
        login: 'http://localhost:1298/api/v1/users/login'
      },
    }
    return sendEmail(mailOptions, 'newUser', options, {})
  }))
})
module.exports = {
  getAllAdministrators,
  notifyAdminsOfFeedback
}