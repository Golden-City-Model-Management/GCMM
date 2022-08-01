

const express = require('express');
const router = express.Router();
const { createResponse } = require('../middleware/responseMiddleware')

const { 
  createFeedback,
  getAllFeedBacks
 } = require('../controllers/feedbackController');

router.post('/', createFeedback, createResponse,).get('/', getAllFeedBacks, createResponse);


module.exports = router