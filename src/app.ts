import express, { Application, Request, Response, NextFunction } from 'express'
import categoryRouter from './routes/categories'

const app: Application = express()
app.use(express.json({ limit: '1000kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/categories', categoryRouter)
app.get('/api/v1/ping', async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'pong',
  })
})

export default app
