// const multer = require('multer')
// import APIFeatures from '../utils/APIFeatures'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import AppError from '../utils/AppError'
import asyncHandler from '../utils/asyncHandler'

const fetchAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await User.find()
  res.status(200).json({
    status: 'success',
    docs,
  })
})

const createDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log('CRREATING', req.body)
  const doc = await User.create(req.body)
  if (!doc) return next(new AppError(`We can't create document ${req.body.name}`, 404))
  res.status(201).json({
    status: 'success',
    doc,
  })
})
// import factory from '../controllers/factory'

// const multerStorage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'public/img/users')
// 	},
// 	filename: function (req, file, cb) {
// 		const ext = file.mimetype.split('/')[1]
// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
// 	},
// })

// const multerFilter = (req, file, cb) => {
// 	if (file.mimetype.startsWith('image')) {
// 		cb(null, true)
// 	} else {
// 		cb(new AppError('Only images are allowed', 400), false)
// 	}
// }
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

// const upload = multer({ dest: 'public/img/users/' })

// exports.uploadUserPhoto = upload.single('photo')

// const filteredObj = (obj:object, allowedFields:string[]) => {
//   const newObj = {}
//   Object.keys(obj).forEach((prop) => {
//     if (allowedFields.includes(prop)) newObj[prop] = obj[prop]
//   })

//   return newObj
// }

// const SendResponse = async (user, statusCode, res) => {
//   res.status(statusCode).json({
//     status: 'success',
//     data: user,
//   })
// }

// const fetchLoggedIn = asyncHandler(async (req, res, next) => {
//   req.params.id = req.user.id
//   next()
// })

// exports.updateCurrentUserPassword = asyncHandler(async (req, res, next) => {
// const user = await Model.findById(req.user.id).select("+password")
// if (!user) return next(new AppError('You must be logged in to update your password', 401))
// if (!(await user.checkPassword(req.body.currentPassword, user.password)))
//     return next(new AppError('Invalid current password', 401))
//   if (req.body.password) return next(new AppError('You cannot use this route for passsword updates', 400))

//   const filteredBody = filteredObj(req.body, ['name', 'email'])
//   if (req.file) filteredBody.photo = req.file.filename
//   // const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//   //   new: true,
//   //   runValidators: true,
//   // })
//   if (!user) return next(new AppError('You must be logged in to change your data', 401))

//   createSendData(user, 200, res)
// })

// const updateLoggedInData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   if (req.body.password)
//     return next(new AppError('You cannot use this route for passsword updates', 400, 'route_not_allowed'))
//   const filteredBody = filteredObj(req.body, ['name', 'email', 'shippingAddresses'])
//   console.log('RU', req.user)
//   console.log('RB', req.body)
//   console.log('FB', filteredBody)
//   // if (req.file) filteredBody.photo = req.file.filename
//   const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   })
//   if (!user) return next(new AppError('You must be logged in to change your data', 401))
//   SendResponse(user, 200, res)
// })

const deleteLoggedIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // await Model.findByIdAndUpdate(req.user.id, { active: false })
  // SendResponse(null, 200, res)
})

const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined.  Please use /signup instead',
  })
})

export { fetchAll, createDoc }
// exports.getAllUsers = factory.getAll(User)
// exports.getUser = factory.getOne(User)
// exports.updateUser = factory.updateOne(User)
// exports.deleteUser = factory.deleteOne(User)
