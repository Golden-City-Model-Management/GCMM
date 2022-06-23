const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv')
const CustomError = require('./utils/errorUtils')
const globalErrorHandler = require('./middleware/errorMiddleware')
const modelsRouter = require('./routes/models');
const usersRouter = require('./routes/users');
const portfoliosRouter = require('./routes/portfolios');
const { verifyClient } = require('./middleware/authMiddleware')

const app = express();
app.enable('trust proxy')
dotenv.config({
  path: `${__dirname}/.env`
})
 
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(verifyClient)
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/models', modelsRouter)
app.use('/api/v1/portfolios', portfoliosRouter)
// catch 404 and forward to error handler
app.all('*', (req, _, next) => {
  next(new CustomError(`CANNOT ${req.method} ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)



module.exports = app;
