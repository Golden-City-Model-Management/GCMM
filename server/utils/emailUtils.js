

const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const path = require('path')
const pug = require('pug');
const dotenv = require('dotenv')
const { convert } = require('html-to-text')
dotenv.config({
  path: './.env'
})

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URL,
); 
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

let transporter
if (process.env.NODE_ENV === 'dev') {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_DEV,
    port: process.env.EMAIL_PORT_DEV,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME_DEV,
      pass: process.env.EMAIL_PASSWORD_DEV,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
} else {

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME_PROD,
      pass: process.env.EMAIL_PASSWORD_PROD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken
    },  
    lessSecureApp: true,
    tls: {
      rejectUnauthorized: false,
    }
  }) 
}

module.exports = class {
  constructor(mailOptions, template, options, locals) {
    this.mailOptions = { ...mailOptions, from: mailOptions.from || process.env.EMAIL_USERNAME_PROD }
    this.template = template
    this.options = options
    this.locals = locals
  }
  generateTxtAndHTML() {
    this.html =
      pug.renderFile(
        path.join(
          `${__dirname}`,
          '../views',
          'emails.templates',
          `${this.template}.pug`),
        this.options)
    this.text = convert(this.html)
    this.mailOptions = {
      ...this.mailOptions,
      html: this.html,
      text: this.text
    }
    return this
  }
  async sendEmail() {
    return new Promise((resolve, reject) => {
      transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          reject({
            response: 'failed',
            error: err
          })
        } else {
          resolve({
            response: 'success',
            info
          })
        }
        transporter.close()
      })
    })
  }
}