const express = require('express');
const router = express.Router();
const meRouter = express.Router()
const { protect, restrict } = require('../middleware/authMiddleware');
const { createResponse } = require('../middleware/responseMiddleware')
const { 
   createNewUser,
   handleDelete,
   getAllUsers,
   loginUser,
   forgotPassword, 
   passwordReset,
   changePassword, 
   editProfile, 
   changeEmail,
   verifyUser,
   } = require('../controllers/userController')

router.post('/login', loginUser, createResponse);
router.get('/verify', verifyUser, createResponse)
router.post('/forgot-password', forgotPassword, createResponse)
router.post('/password-reset/:token/:id', passwordReset, createResponse)
router.use('/me', meRouter)
meRouter.patch ('/change-password', protect('+password'), changePassword, createResponse);
meRouter.patch('/change-email', protect('+active'),  changeEmail, createResponse)
meRouter.patch('/', protect(), editProfile, createResponse);

router.use(protect(), restrict('admin'))
router.delete('/:id',handleDelete, createResponse)
router.post('/',createNewUser, createResponse);
router.get('/', getAllUsers, createResponse)


module.exports = router;
