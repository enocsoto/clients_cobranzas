import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import paymentRoutes from './routes/paymentRoutes'

const app = express()

//use express
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/clients', userRoutes)
app.use('/api/payments', paymentRoutes)

export default app;