
const { asyncHelper } = require('../utils/async')


module.exports.createResponse = asyncHelper(async(req, res, _) => {

  const finalData = {
    status: req.status,
    message: req.message, 
    ...req.data
  }
  return res.status(req.statusCode).json({
    ...finalData
  })
})