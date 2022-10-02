const { asyncHelper } = require('../utils/async')

module.exports.createDocument = (Model) => {
  return asyncHelper(async (req, _res, next) => {
    const doc = new Model({ ...req.body });
    const savedDoc = await doc.save()
    req.savedDoc = savedDoc
    next()
  })
}

