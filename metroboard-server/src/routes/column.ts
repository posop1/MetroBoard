import { Router } from 'express'
import { createColumn, getAllColumn } from '../controllers/column'

const router = Router()

router.get('/', getAllColumn)
router.post('/', createColumn)

export default router
