import { Router } from 'express'
import { mockLogin } from '../controllers/auth'

const router = Router()

router.post('/login', mockLogin)

export default router
