const express = require('express');
const router = express.Router();
const meRouter = express.Router()
const { protect, restrict } = require('../middleware/authMiddleware');
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



router.post('/login', loginUser);
router.get('/verify', verifyUser)
router.post('/forgot-password', forgotPassword)
router.post('/password-reset/:token/:id', passwordReset)
router.use('/me', meRouter)
meRouter.patch ('/change-password', protect('+password'), changePassword);
meRouter.patch('/change-email', protect('+active'),  changeEmail)
meRouter.patch('/', protect(), editProfile);
router.post('/',createNewUser);

router.use(protect(), restrict('admin'))
router.delete('/:id',handleDelete)
router.get('/', getAllUsers)
module.exports = router;
