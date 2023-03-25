import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { authRouter, userRouter, columnRouter, taskRouter, commentRouter } from './app'

const app = express()

dotenv.config()

//constants
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL as string

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/column', columnRouter)
app.use('/api/task', taskRouter)
app.use('/api/comment', commentRouter)

const connectDataBase = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(DB_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}

const startApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening in ${PORT}`)
      connectDataBase()
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
