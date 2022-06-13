

const express = require('express');
const multer = require('multer')
const router = express.Router();
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
.get(getAllPortfolios)
.post(protect(), restrict('admin', 'manager'), multer, addPortfolio)

router.route('/:modelId/:imageId')
.delete(protect(), restrict('admin', 'manager'), deletePortfolio)

router.route('/:modelId')
.delete(protect(), restrict('admin', 'manager'), deletePortfolio)
 
module.exports = router