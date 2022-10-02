const User = require('../models/user')
const express = require('express');
const router = express.Router();
const meRouter = express.Router()
const { protect, restrict, logout, checkSession } = require('../middleware/auth');
const { createResponse } = require('../middleware/response')
const { createDocument } = require('../middleware/createDoc')
const { deleteByIdParam } = require('../middleware/deleteDoc')
const { 
   createNewUser,
   getAllUsers,
   loginUser,
   forgotPassword, 
   passwordReset,
   changePassword, 
   editProfile, 
   changeEmail,
   verifyUser,
   getUser,
   } = require('../controllers/users');

router.post('/login', loginUser, createResponse);
router.get('/logout', protect(), logout)
router.get('/verify', verifyUser, createResponse)
router.post('/forgot-password', forgotPassword, createResponse)
router.post('/password-reset/:token/:id', passwordReset, createResponse)
router.post('/session', checkSession(), createResponse)

router.use('/me', meRouter) 
meRouter.get('/', protect("-__v -createdAt -passwordResetExpires -passwordResetToken"), getUser, createResponse)
meRouter.patch ('/change-password', protect('+password'), changePassword, createResponse);
meRouter.patch('/change-email', protect('+active'),  changeEmail, createResponse)
meRouter.patch('/', protect(), editProfile, createResponse);

router.use(protect(), restrict('admin'))
router.delete('/:id', deleteByIdParam(User), createResponse)
router.post('/', createDocument(User), createNewUser, createResponse);
router.get('/', getAllUsers, createResponse)


module.exports = router;
