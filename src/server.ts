import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import app from './app'
// import config from 'config'
import myConfig from '../config'

dotenv.config()

// const port = config.get('port')

const dbUrl = `mongodb://${myConfig.DB_USER}:${myConfig.DB_PASSWORD}@${myConfig.DB_IP}:${myConfig.DB_PORT}`
// const port = myConfig.PORT ? Number(myConfig.PORT) : 5000

// async function run() {
//   await connect(db)
// }

mongoose
  .connect(dbUrl, { dbName: myConfig.DB_NAME })
  .then(() => {
    console.log(colors.magenta.bold(`Database connection succesfull`))
    app.listen(myConfig.PORT, () => {
      console.log(colors.cyan.bold(`server running on port ${myConfig.PORT}...`))
    })
  })
  .catch((err) => {
    console.log(colors.red.bold(`Mongo DB Error ${err}`))
    console.log(colors.red.bold(`Mongo DB Error Message ${err.message}`))
  })
