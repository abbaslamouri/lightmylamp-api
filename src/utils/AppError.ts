class AppError extends Error {
  // statusCode?: number

  status: string
  code?: number
  keyValue?: object
  // custom: boolean
  // errorCode: string
  constructor(
    message: string,
    public statusCode: number // public code?: number, // public keyValue?: object,
  ) // public errorCode?: string
  {
    super(message)
    this.statusCode = statusCode ? statusCode : 500
    this.status = !statusCode || !`${statusCode}`.startsWith('4') ? 'error' : 'fail'
    // this.custom = true
    // this.code = code
    // this.keyValue = keyValue
    this.message = message ? message : 'Something went terribly wrong'

    // const status = err.status ? err.status : 'error'
    // const statusCode = err.statusCode ? err.statusCode : 500
    // this.message = message
    // this.errorCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
