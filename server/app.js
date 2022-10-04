
// curl -i -X OPTIONS -H "Origin: https://gcmm-server.onrender.com" \
// -H 'Access-Control-Request-Method: POST' \
// -H 'Access-Control-Request-Headers: Content-Type, Authorization' \
// "https://goldencityadmin.netlify.app"

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv')
const CustomError = require('./utils/error')
const globalErrorHandler = require('./middleware/error')
const modelsRouter = require('./routes/model');
const usersRouter = require('./routes/user');
const portfoliosRouter = require('./routes/portfolio');
const feedbackRouter = require('./routes/feedback');
const galleryRouter = require('./routes/gallery')

const whitelist = [
  'https://goldencityadmin.netlify.app',
  'https://goldencitymodelsng.netlify.app',
  'http://localhost:4000',
  'http://localhost:3000',
]

const app = express();
app.enable('trust proxy')
dotenv.config({
  path: `${__dirname}/.env`
})

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   console.log(req.header('Origin'))
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
app.options('*', cors())
app.use('*', cors())
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/models', modelsRouter)
app.use('/api/v1/portfolios', portfoliosRouter)
app.use('/api/v1/feedback', feedbackRouter)
app.use('/api/v1/gallery', galleryRouter) 

app.all('*', (req, _, next) => {
  next(new CustomError(`CANNOT ${req.method} ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)



module.exports = app;
