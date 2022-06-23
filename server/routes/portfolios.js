

const express = require('express');
const router = express.Router();
const { createResponse } = require('../middleware/responseMiddleware')
const { 
  protect, 
  restrict
} = require('../middleware/authMiddleware');
const { 
  getAllPortfolios,
  deletePortfolio,
  addPortfolio,
} = require('../controllers/portfolioController')

router.route('/')
.get(getAllPortfolios, createResponse)
.post(protect(), restrict('admin', 'manager'), addPortfolio, createResponse)

router.route('/:modelId/:imageId')
.delete(protect(), restrict('admin', 'manager'), deletePortfolio, createResponse)

router.route('/:modelId')
.delete(protect(), restrict('admin', 'manager'), deletePortfolio, createResponse)
 
module.exports = router