

const express = require('express');
const router = express.Router();
const { createResponse } = require('../middleware/response')

const { 
  createFeedback,
  getAllFeedBacks
 } = require('../controllers/feedback');
const { createDocument } = require('../middleware/createDoc');
const feedbackModel = require('../models/feedback');

router.post('/', createDocument(feedbackModel), createFeedback, createResponse,).get('/', getAllFeedBacks, createResponse);


module.exports = router