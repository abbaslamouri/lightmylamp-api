import express, { Request, Response } from 'express'
import errorHandler from './utils/errorHandler'
// import connectRedis from 'connect-redis';
// import session from 'express-session';
// const RedisStore = connectRedis(session);
import config from './config/default'
import categoryRouter from './routes/categories'
import authRouter from './routes/auth'
import userRouter from './routes/users'

console.log(config.PORT)

const app = express()
app.use(express.json({ limit: '1000kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.get('/api/v1/ping', async (req: Request, res: Response) => {
  res.status(200).json({
    status: `success ${config.PORT}`,
    message: 'pong',
  })
})

app.use(errorHandler)

export default app
