import { Router } from 'express'
import { getMe, getUserById } from './user.controller'
import { checkAuth } from '../../libs/checkAuth'

const router = Router()

router.get('/me', checkAuth, getMe)
router.get('/:id', checkAuth, getUserById)

export const userRouter = router
