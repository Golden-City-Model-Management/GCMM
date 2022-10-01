const { asyncHelper } = require('../utils/asyncUtils')

module.exports.createDocument = (Model) => {
  return asyncHelper(async (req, _res, next) => {
    console.log('nbvhhvh')
    const doc = new Model({ ...req.body });
    const savedDoc = await doc.save()
    console.log(savedDoc, 'hjjhjkhjk')
    req.savedDoc = savedDoc
    next()
  })
}

