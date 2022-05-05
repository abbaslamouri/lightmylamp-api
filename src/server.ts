import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import { createClient } from 'redis'
import connectRedis from 'connect-redis'
import session from 'express-session'
import app from './app'
import config from './config/default'

dotenv.config()

const redisClient = createClient({
  // url: `redis:${config.REDIS_IP}`,
  legacyMode: true
})
const RedisStore = connectRedis(session)
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 30000, httpOnly: true },
  })
)

const dbUrl = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_IP}:${config.DB_PORT}`

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
