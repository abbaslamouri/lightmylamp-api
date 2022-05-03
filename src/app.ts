import express, { Application, Request, Response, NextFunction } from 'express'
import categoryRouter from './routes/categories'
import authRouter from './routes/auth'
import userRouter from './routes/users'

const app = express()
app.use(express.json({ limit: '1000kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.get('/api/v1/ping', async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'pong',
  })
})

export default app
