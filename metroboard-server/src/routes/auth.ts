import { Router } from 'express'
import { mockLogin } from '../controllers/auth'

const router = Router()

router.post('/mocklogin', mockLogin)

export default router
