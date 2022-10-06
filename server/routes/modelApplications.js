const router = require('express').Router()
const ModelApplication = require('../models/modelApplication')
const { getAllApplications, createNewApplication } = require('../controllers/modelApplication')
const { createResponse } = require('../middleware/response')
const { createDocument } = require('../middleware/createDoc')
const { protect, restrict } = require('../middleware/auth')
const { deleteByIdParam } = require('../middleware/deleteDoc')

router.route('/')
.get(getAllApplications, createResponse)
.post(protect(), restrict('admin', 'manager'), createDocument(ModelApplication), createNewApplication, createResponse)

router.route('/:id').delete(protect(), restrict('admin', 'manager'), deleteByIdParam(ModelApplication), createResponse)

module.exports = router