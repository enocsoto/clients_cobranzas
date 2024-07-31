import 'dotenv/config'
import "reflect-metadata"
import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { AppDataSource } from "./config/connection"
import { routerPayments, routerUser } from './routes'
export class Main {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.db();
    this.middlewares();
    this.routes;
  }
  async db() {
    await AppDataSource.initialize();
    console.log('Database connection established successfully')
  }

  routes() {
    this.app.use('/api/user', routerUser)
    this.app.use('/api/payment', routerPayments)
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

