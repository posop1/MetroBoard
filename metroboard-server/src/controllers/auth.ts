import { ILoginReq } from '../types/reqTypes'
import { Request, Response } from 'express'
import { uid } from 'uid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from '../types/auth'
import { getUserData } from '../utils/getDataFile'
import { writeUserData } from '../utils/writeDataFile'

export const register = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body

    const userData = getUserData()
    if (!userData) {
      return res.status(400).json({ message: 'user data not found' })
    }

    const isUsed = userData.find((user) => user.username === username)
    if (isUsed) {
      return res.status(400).json({
        message: 'Username is busy'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser: IUser = {
      _id: uid(16),
      username,
      password: hash
    }

    const token = jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    userData.push(newUser)

    writeUserData(userData)

    res.json({
      newUser,
      token
    })
  } catch (error) {
    res.status(400).json({ message: 'Auth error' })
    console.log(error)
  }
}

export const login = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { password, username } = req.body

    const userData = getUserData()
    if (!userData) {
      return res.status(400).json({ message: 'user data not found' })
    }

    const user = userData.find((user) => user.username === username)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password not correct' })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user
    })
  } catch (error) {
    res.status(400).json({ message: 'Auth error' })
    console.log(error)
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const userData = getUserData()
    if (!userData) {
      return res.status(400).json({ message: 'user data not found' })
    }

    const user = userData.find((user) => user._id === req.headers.userId)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({ message: 'Auth error' })
    console.log(error)
  }
}
