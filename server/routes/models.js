const express = require('express');
const router = express.Router();
const Model = require('../models/modelModel')
const { createResponse } = require('../middleware/responseMiddleware')
const { protect, restrict } = require('../middleware/authMiddleware');
const { handleNotFound } = require('../middleware/modelMiddleware')
const { 
   createNewModel,
   editModelProfile,
   getAllModels ,
   handleDelete,
   getModel
  } = require('../controllers/modelController')

router.route('/')
  .post(protect(), restrict('admin', 'manager'), createNewModel, createResponse)
  .get(getAllModels, createResponse)

router.route('/:id')
  .get(handleNotFound(Model), getModel, createResponse)
  .patch(protect(), restrict('admin', 'manager'), handleNotFound(Model), editModelProfile, createResponse) 
  .delete(protect(), restrict('admin', 'manager'), handleNotFound(Model), handleDelete, createResponse)
module.exports = router; 

// TODO add controllers for routes