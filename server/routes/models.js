const express = require('express');
const router = express.Router();
const Model = require('../models/modelModel')
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
  .post(protect(), restrict('admin', 'manager'), createNewModel)
  .get(getAllModels)

router.route('/:id')
  .get(handleNotFound(Model), getModel)
  .patch(protect(), restrict('admin', 'manager'), handleNotFound(Model), editModelProfile) 
  .delete(protect(), restrict('admin', 'manager'), handleNotFound(Model), handleDelete)
module.exports = router; 

// TODO add controllers for routes