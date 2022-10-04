
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
  'https://goldencityadmin.netlify.app/',
  'https://goldencitymodelsng.netlify.app/',
  'http://localhost:4000/',
  'http://localhost:3000/',
]

const app = express();
app.enable('trust proxy')
dotenv.config({
  path: `${__dirname}/.env`
})
app.options('*', (req, res) => {
  console.log(req.headers.referer, req.headers.origin.slice(0, req.headers.origin.length))
  if(whitelist.includes(req.headers.referer)){
    res.header("Access-Control-Allow-Origin", req.headers.referer.slice(0, req.headers.referer.length - 1)); 
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); 
  res.send('ok');
});
app.use(function(req, res, next) {
  if(whitelist.includes(req.headers.referer)){
    res.header("Access-Control-Allow-Origin", req.headers.referer.slice(0, req.headers.referer.length - 1)); 
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
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
