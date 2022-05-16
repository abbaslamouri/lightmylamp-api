import os from 'os'
import express, { Request, Response } from 'express'
import cors from 'cors'
import AppError from './utils/AppError'
// import { createClient } from 'redis'
// import connectRedis from 'connect-redis'
// import session from 'express-session'
import errorHandler from './utils/errorHandler'
import config from './config/default'
import categoryRouter from './routes/v1/categories'
import authRouter from './routes/v1/auth'
import userRouter from './routes/v1/users'

// declare module 'express-session' {
//   export interface SessionData {
//     user: { [key: string]: any }
//   }
// }

// let RedisStore = connectRedis(session)
// let redisClient = createClient({
//   url: `${config.REDIS_IP}:${config.REDIS_PORT}`,
//   legacyMode: true,
// })

const app = express()
app.set('trust proxy', true)
app.use(cors({}))

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: config.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 300000, httpOnly: true },
//   })
// )

app.use(express.json({ limit: '1000kb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/api/v1/ping', async (req: Request, res: Response) => {
  console.log(`Sending response from container ${os.hostname()}`)
  res.status(200).json({
    status: `success ${config.PORT}`,
    message: 'pong',
    response: `Sending response from container ${os.hostname()}`,
  })
})
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.all('*', async (req: Request, res: Response, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorHandler)

export default app
