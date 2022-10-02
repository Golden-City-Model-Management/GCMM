
const router = require('express').Router()
const { protect, restrict } = require('../middleware/auth')
const { createResponse } = require('../middleware/response')
const { addImages } = require('../controllers/gallery')

router.route('/').post(protect(), restrict('admin'), addImages, createResponse)


module.exports = router