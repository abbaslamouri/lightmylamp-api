import { Request, Response, NextFunction } from 'express'
import colors from 'colors'
import AppError from './AppError'

const sendError = (res: Response, err: AppError) => {
  // const statusCode = err.statusCode ? err.statusCode : 500
  // const message = err.message ? err.message : 'Something went terribly wrong'

  // const status = err.status ? err.status : 'error'
  // const statusCode = err.statusCode ? err.statusCode : 500
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === 'production') {
    // let message = ''
    // if (err.custom) message = err.message
    // else message = 'Something went terribly wrong'
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(colors.red.bold(`ERRRRRR', ${err}`))

  // const sendObj = {}
  // res.json({
  //   message: err.message,
  //   err: err,
  //   stack: err.stack,
  // })
  // console.log(colors.red.bold('STACK', err.stack))
  // res.status(500).json('error', { error: err })
  // let error = { ...err }
  // console.log('AAAAAAA', typeof err, object)

  // Custom errors
  // if (err.custom) {
  // }

  // Mongodb errors
  if (err.code && err.code === 11000) {
    err.statusCode = 400
    // err.custom = true
    if (err.keyValue) {
      const field = Object.keys(err.keyValue)[0]
      const fieldValue = Object.values(err.keyValue)[0]
      err.message = `${
        field[0].toUpperCase() + field.substring(1)
      } must be unique. The specified ${field} = ${fieldValue} is already associated with an account.`
    }
  }

  // if (err.name && err.name === 'CastError') {
  //   if(err.path && err.value
  //   error = new AppError(`Invalid ${err.path}: ${err.value}`, 400, 'castError')

  // } else if (err.name === 'ValidationError') {
  //   let errorStr =''
  //   if (err.errors) errorStr= Object.values(err.errors).map((item) => item.message)
  //   error = new AppError(errorStr, 400, 'validationError')
  // } else if (err.name === 'JsonWebTokenError') {
  //   error = new AppError(`Invalid token`, 401, 'jsonWebTokenError')
  // } else if (err.name === 'TokenExpiredError') {
  //   error = new AppError(`Your token has expired. please login`, 401, 'tokenExpiredError')
  // } else error = err
  sendError(res, err)
}

export default errorHandler
