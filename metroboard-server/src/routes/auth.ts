import { Router } from 'express'
import { getMe, login, register } from '../controllers/auth'
import { checkAuth } from '../utils/checkAuth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)

export default router
