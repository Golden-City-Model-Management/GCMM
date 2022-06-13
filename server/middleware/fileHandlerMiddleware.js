
const multer = require('multer')
const sharp = require('sharp')
const { asyncHelper } = require('../utils/asyncUtils')
const { createCustomError } = require('../utils/controllerUtils')



// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/portfolios')
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1]
//     const fileName = `portfolio-${req.body.model}-${Date.now()}.${ext}`
//     cb(null, fileName)
//   }
// })
const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) cb(null, true)
  else cb(createCustomError('Not an image! Only image are allowed!', 400), false)
}
const upload = multer({
  storage: multerStorage, 
  fileFilter: multerFilter})

module.exports.resizeImage = asyncHelper(async(req, res, next) => {
  if(!req.file) return next()
  sharp(req.file.buffer)
  .resize(500, 500)
  .toFormat('jpeg')
  .jpeg()
})
module.exports.saveToCloud = asyncHelper((req, res, next) => {

  req.body.image = 'path to noexistent image'
 next()
})
 