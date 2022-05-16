import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import config from './config/default'

const dbConnect = async () => {
  console.log('DBURI', config.DB_URI)
  console.log('ENV', config.NODE_ENV)
  console.log('JWT SECRET', config.JWT_SECRET)
  try {
    if (!config.JWT_SECRET) throw new Error('Environment variable JWT_SECRET is not defined')
    if (!config.DB_URI) throw new Error('Environment variable DB_URI is not defined')
    await mongoose.connect(config.DB_URI)
    console.log(colors.magenta.bold(`Database connection succesfull`))
    app.listen(config.PORT, () => {
      console.log(colors.cyan.bold(`server running on port ${config.PORT}...`))
    })
  } catch (err) {
    console.log(colors.red.bold(`Mongo DB Error ${err}`))
    // console.log(colors.red.bold(`Mongo DB Error Message ${err.message}`))
  }
}

dbConnect()

// const dbUrl = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_IP}:${config.DB_PORT}`

// mongoose
//   .connect(dbUrl, { dbName: config.DB_NAME })
//   .then(() => {
//     console.log(colors.magenta.bold(`Database connection succesfull`))
//     app.listen(config.PORT, () => {
//       console.log(colors.cyan.bold(`server running on port ${config.PORT}...`))
//     })
//   })
//   .catch((err) => {
//     console.log(colors.red.bold(`Mongo DB Error ${err}`))
//     console.log(colors.red.bold(`Mongo DB Error Message ${err.message}`))
//   })
