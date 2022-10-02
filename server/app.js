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
const inquiriesRouter = require('./routes/feedback');

const app = express();
app.enable('trust proxy')
dotenv.config({
  path: `${__dirname}/.env`
})
app.use(cors( {origin: [
  "http://localhost:4000",
  "http://localhost:3000",
  "https://goldencitymodelsng.netlify.app",
  "https://goldencityadmin.netlify.app/admin",
  "https://goldencityadmin.netlify.app"
],
credentials: true,
exposedHeaders: ["set-cookie"],
}))
app.options('*', cors())
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/models', modelsRouter)
app.use('/api/v1/portfolios', portfoliosRouter)
app.use('/api/v1/feedback', inquiriesRouter)

app.all('*', (req, _, next) => {
  next(new CustomError(`CANNOT ${req.method} ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)



module.exports = app;
