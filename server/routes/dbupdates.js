

const router = require('express').Router()
const { createResponse } = require('../middleware/response')
const { renameFields, unsetFields } = require('../dbupdates/controller')
const { protect, restrict } = require('../middleware/auth')
const { getModel } = require('../dbupdates/middleware.js')

router.route('/rename-fields').post(protect(), restrict('admin'), getModel, renameFields, createResponse)
router.route('/unset-fields').post(protect(), restrict('admin'), getModel, unsetFields, createResponse)

module.exports = router