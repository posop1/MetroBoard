import { ILoginReq } from '../types/auth'
import { Request, Response } from 'express'
import { uid } from 'uid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const mockLogin = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const user = {
      _id: uid(16),
      username,
      password: hash
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
