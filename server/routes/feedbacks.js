

const express = require('express');
const router = express.Router();
const { createResponse } = require('../middleware/responseMiddleware')

const { 
  createFeedback,
  getAllFeedBacks
 } = require('../controllers/feedbackController');
const { createDocument } = require('../middleware/createDocument');
const feedbackModel = require('../models/feedbackModel');

router.post('/', createDocument(feedbackModel), createFeedback, createResponse,).get('/', getAllFeedBacks, createResponse);


module.exports = router