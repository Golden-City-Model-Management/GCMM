
const CustomError = require('./error')
const { asyncHelper, noArgsAsyncHelper } = require('./async')
const EmailHandler = require('./email')
const QueryBuilder = require('./queryBuilder')


const sendEmail = async (mailOptions, template, options, locals) => {
  return await new EmailHandler(mailOptions, template, options, locals).generateTxtAndHTML().sendEmail()
}
const createMailOptions = (from, to, subject) => {
  return {
    from,
    to,
    subject
  }
}
const createCustomError = (message, code) => {
  return new CustomError(message, code)
}
const editFields = (document, fields, newData) => {
  fields.forEach(field => {
    document[field] = newData[field]
  })
  return document
}

const createDocument = (Model, data) => noArgsAsyncHelper( async () => {
    const doc = new Model({ ...data });
    const savedDoc = await doc.save()
    return savedDoc
}) 

const getAllDocuments = (Model) => {
  const query = Model
  return asyncHelper(async (req, res, next) => {
    const docs = await new QueryBuilder(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query 
    req.statusCode = 200 
    req.status = 'success'
    req.message = 'Documents fetched'
    req.data = {
      total_count: docs.length,
      docs
    }
    return next()
  })
}
module.exports = {
  sendEmail,
  createCustomError,
  createMailOptions,
  editFields,
  createDocument,
  getAllDocuments
}