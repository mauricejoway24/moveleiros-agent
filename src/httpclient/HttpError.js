class HttpError extends Error {
  constructor (errorMessage, statusCode) {
    super(errorMessage)
    this.statusCode = statusCode
  }
}
export default HttpError
