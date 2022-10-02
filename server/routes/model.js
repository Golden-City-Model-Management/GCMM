const express = require('express');
const router = express.Router();
const Model = require('../models/model')
const { createResponse } = require('../middleware/response')
const { protect, restrict } = require('../middleware/auth');
const { findDocBySlugOrName, findByIdParam } = require('../middleware/findDoc')
const { createDocument } = require('../middleware/createDoc')
const { deleteByIdParam } = require('../middleware/deleteDoc')
const { 
   createNewModel,
   editModelProfile,
   getAllModels ,
   getModel 
  } = require('../controllers/model')

router.route('/')
  .post(protect(), restrict('admin', 'manager'), createDocument(Model), createNewModel, createResponse)
  .get(getAllModels, createResponse)

router.route('/:slug').get(findDocBySlugOrName(Model), getModel, createResponse)
router.route('/:id')
  .get(findByIdParam(Model), getModel, createResponse)
  .patch(protect(), restrict('admin', 'manager'), findByIdParam(Model), editModelProfile, createResponse) 
  .delete(protect(), restrict('admin', 'manager'), deleteByIdParam(Model), createResponse)
module.exports = router; 

