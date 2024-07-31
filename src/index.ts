import "reflect-metadata"
import app from './app';
import { AppDataSource } from "./config/connection"
const port = process.env.PORT || 3000
import 'dotenv/config'
async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })

  } catch (error) {
    throw new Error(`error connecting to Database`)
  }
}
main();
