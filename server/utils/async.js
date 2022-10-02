

module.exports.asyncHelper = (asyncFunction) => {
  return async (req, res, next) => {
    try {
     return await asyncFunction(req, res, next)
    } catch (err) {
     return next(err)
    }
  }
}

module.exports.noArgsAsyncHelper = async (asyncFunction) => {
    try {
     return await asyncFunction()
    } catch (err) {
      throw new Error(err.message)
    }
}