import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../user/index'
import { Request, Response } from 'express'
import { ILoginReq } from './types'

export const register = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed) {
      return res.status(400).json({
        message: 'Username is busy'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hash
    })

    const token = jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    await newUser.save()

    res.json({
      newUser,
      token
    })
  } catch (error) {
    res.status(400).json({ message: 'Auth error' })
  }
}

// Login user
export const login = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Password not correct'
      })
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
  }
}
