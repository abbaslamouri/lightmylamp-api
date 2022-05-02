class AppError extends Error {
  // statusCode: number
  status: string
  isOperational: boolean
  // errorCode: string
  constructor(message: string, public statusCode: number, public errorCode: string) {
    super(message)
    // this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    // this.errorCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
