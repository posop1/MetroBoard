import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth'
import columnRoute from './routes/column'

const app = express()

dotenv.config()

//constants
const PORT = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', authRoute)
app.use('/api/column', columnRoute)

const startApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening in ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
