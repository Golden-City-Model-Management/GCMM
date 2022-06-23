
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
const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({
    data
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
    // return createResponse(res, 203, {
    //   status: 'success', message: 'Successfully updated profile!', saved})
    req.statusCode = 200
    req.status = 'success'
    req.message = 'Successfully updated!'
    req.data = { doc: {...saved} }
    return next()
  })
}
const deleteDocument = (Model, queryKey, queryValue) => {
  return asyncHelper(async (_, res, next) => {
    const document = await Model.findOneAndDelete({ [queryKey]: queryValue })
    if (!document) return next(createCustomError('Unable to perform request. Resource not found', 404))
    // createResponse(res, 204,
    //   { status: 'success', message: 'Successfully deleted user',})
    req.statusCode = 204
    req.status = 'success'
    req.message = 'Successfully deleted!'
    return next()
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
      req.sttusCode = 204
      req.status = 'success'
      if(docs.deletedCount < isMultipleDelete.length){
          //  return createResponse(res, 204, {
          //    status:  'success', 
          //    message: 'Not all documents were deleted. Likely because the documents do not exist'
          //  })
          req.message = 'Not all documents were deleted. Likely because the documents do not exist'
          return next()
      }
      // return createResponse(res, 204, {
      //   status:  'success',
      //   message:  'Successfully deleted.',
      // })
      req.message = 'Successfully deleted!'
      return next()
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
    // return createResponse(res, 200, {
    //   status: 'success', 
    //   message: 'Documents fetched', 
    //   total_count: docs.length,
    //   docs
    // })
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