import { RequestHandler, Request, Response, NextFunction } from 'express'
import colors from 'colors'
import AppError from './AppError'

const sendError = (res: Response, error: AppError) => {
  if (process.env.NODE_ENV === 'production') {
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message ? error.message.split(',').join('<br>') || 'Server error' : '',
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Something went terribly wrong',
      })
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('VVVVVVV', error)
    res.status(200).json({
      error,
      errorCode: error.errorCode,
      status: error.status,
      message: error.message ? error.message.split(',').join('<br>') || 'Server error' : '',
      stack: error.stack,
    })
  }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(colors.red.bold('ERRRRRR', err.message))
  // console.log(colors.red.bold('STACK', err.stack))
  // res.status(500).json('error', { error: err })
  // let error = {}
  // console.log('AAAAAAA', typeof err, object)
  // if (err.name === 'CastError') {
  //   error = new AppError(`Invalid ${err.path}: ${err.value}`, 400, 'castError')
  // } else if (err.code === 11000) {
  //   const field = Object.keys(err.keyValue)[0]
  //   const fieldValue = Object.values(err.keyValue)[0]
  //   error = new AppError(
  //     `${
  //       field[0].toUpperCase() + field.substring(1)
  //     } must be unique.  The specified ${field} = ${fieldValue} is already associated with a YRL account.`,
  //     400,
  //     'not-unique'
  //   )
  // } else if (err.name === 'ValidationError') {
  //   let errorStr =''
  //   if (err.errors) errorStr= Object.values(err.errors).map((item) => item.message)
  //   error = new AppError(errorStr, 400, 'validationError')
  // } else if (err.name === 'JsonWebTokenError') {
  //   error = new AppError(`Invalid token`, 401, 'jsonWebTokenError')
  // } else if (err.name === 'TokenExpiredError') {
  //   error = new AppError(`Your token has expired. please login`, 401, 'tokenExpiredError')
  // } else error = err
  // sendError(res, error)
}

export default errorHandler
