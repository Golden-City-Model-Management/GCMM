const express = require('express');
const router = express.Router();
const { protect, restrict } = require('../middleware/authMiddleware');
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
  .get(getModel)
  .patch(protect(), restrict('admin', 'manager'), editModelProfile) 
  .delete(protect(), restrict('admin', 'manager'), handleDelete)
module.exports = router;

// TODO add controllers for routes