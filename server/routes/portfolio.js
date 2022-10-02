

const Portfolio = require('../models/portfolio');
const express = require('express');
const router = express.Router();
const { createResponse } = require('../middleware/response');
const { findByIdParam, } = require('../middleware/findDoc');
const { deleteByIdParam } = require('../middleware/deleteDoc')
const { 
  protect, 
  restrict
} = require('../middleware/auth');
const { 
  getAllPortfolios,
  addPortfolio,
  getModelPortfolio,
} = require('../controllers/portfolios');

router.route('/')
.get(getAllPortfolios, createResponse)
.post(protect(), restrict('admin', 'manager'), addPortfolio, createResponse)

router.route('/:model')
.get(getModelPortfolio, createResponse)

router.route('/:id')
.delete(protect(), restrict('admin', 'manager'), deleteByIdParam(Portfolio), createResponse)
 
module.exports = router