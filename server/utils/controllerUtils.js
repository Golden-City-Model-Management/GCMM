
const CustomError = require('./errorUtils')
const { asyncHelper } = require('./asyncUtils')
const EmailHandler = require('./emailUtils')
const QueryBuilder = require('./queryBuilderUtils')


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
const createResponse = (res, statusCode, status, message, data) => {
  return res.status(statusCode).json({
    status: status,
    data: {
      message,
      data
    }
  })
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
const createDocument = (Model, data) => {
  return async (_req, _res, next) => {
    const doc = new Model({ ...data });
    const res = await doc.save()
    if (!res) return next(createCustomError('Unable to create document! Please try again later', 500))
    return res
  }
}
const editDocument = (excludedFields, document) => {
  return asyncHelper(async (req, res, next) => {
    const fieldsToChange = Object.keys(req.body)
    for (field of excludedFields) {
      if (req.body[field]) return next(createCustomError('Not allowed to perform that action!', 403))
    }
    editFields(document, fieldsToChange, req.body)
    const saved = await document.save()
    if (!saved) { return next(createCustomError('Unable to update profile! Please try again later', 500)) }
    return createResponse(res, 203, 'success', 'Successfully updated profile!', saved)
  })
}
const deleteDocument = (Model, queryKey, queryValue) => {
  return asyncHelper(async (_, res, next) => {
    const document = await Model.findOneAndDelete({ [queryKey]: queryValue })
    if (!document) return next(createCustomError('Unable to perform request. Resource not found', 404))
    createResponse(res, 204, 'success', 'Successfully deleted user',)
    return true
  })
}
const handleDocDelete = (Model, queryKey) => {
  return asyncHelper(async (req, res, next) => {
    const isSingleDelete = req.params[queryKey]
    const isMultipleDelete = req.body[`${queryKey}s`]
    if (isSingleDelete) {
      return deleteDocument(Model, queryKey, isSingleDelete)(req, res, next)
    } else if (isMultipleDelete) {
      const docs = await Model.deleteMany({ [queryKey]: { $in: isMultipleDelete } })
      if(docs.deletedCount < isMultipleDelete.length){
           return createResponse(res, 200, 'success', 'Not all documents were deleted. Likely because the documents do not exist', {})
      }
      return createResponse(res, 204, 'success', 'Successfully deleted.',)
    } else {
      return next(createCustomError('Bad request!', 401))
    }
  })
}
const getAllDocuments = (Model) => {
  const query = Model
  return asyncHelper(async (req, res, next) => {
    const docs = await new QueryBuilder(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query
    return createResponse(res, 200, 'success', {total_count: docs.length, docs})
  })
}
module.exports = {
  sendEmail,
  createResponse,
  createCustomError,
  createMailOptions,
  editFields,
  editDocument,
  deleteDocument,
  handleDocDelete,
  createDocument,
  getAllDocuments
}