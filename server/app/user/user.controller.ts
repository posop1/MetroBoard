import jwt from 'jsonwebtoken'
import { User } from './user.model'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(404).json({ message: 'users not found' })
    }

    res.json(users)
  } catch (error) {
    console.log('get users error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.headers.userId)

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
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
      user,
      token
    })
  } catch (error) {
    console.log('get me error', error)
    res.status(400).json({ message: 'get me error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    res.json(user)
  } catch (error) {
    console.log('get use by id error', error)
    res.status(400).json({ message: 'get user by id error' })
  }
}

export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userId

    const user = await User.findByIdAndRemove(userId)
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    res.json({ message: 'remove success' })
  } catch (error) {
    console.log('remove user error', error)
    res.status(400).json({ message: 'error' })
  }
}
