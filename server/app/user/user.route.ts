import { Router } from 'express'
import { getMe, getUserById, getUsers, removeUser } from './user.controller'
import { checkAuth } from '../utils/checkAuth'

const router = Router()

router.get('/', checkAuth, getUsers)
router.get('/me', checkAuth, getMe)
router.get('/:id', checkAuth, getUserById)
router.delete('/', checkAuth, removeUser)

export const userRouter = router
