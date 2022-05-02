import mongoose from 'mongoose'
import colors from 'colors'
// import dotenv from 'dotenv'
import app from './app'
import config from '../config'

// dotenv.config()

const dbUrl = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_IP}:${config.DB_PORT}`
// const port = config.PORT ? Number(config.PORT) : 5000

// async function run() {
//   await connect(db)
// }

mongoose
  .connect(dbUrl, { dbName: config.DB_NAME })
  .then(() => {
    console.log(colors.magenta.bold(`Database connection succesfull`))
    app.listen(config.PORT, () => {
      console.log(colors.cyan.bold(`server running on port ${config.PORT}...`))
    })
  })
  .catch((err) => {
    console.log(colors.red.bold(`Mongo DB Error ${err}`))
    console.log(colors.red.bold(`Mongo DB Error Message ${err.message}`))
  })
