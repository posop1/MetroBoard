import { Router } from 'express'
import { createColumn, deleteColumn, getAllColumn, updateColumn } from '../controllers/column'

const router = Router()

router.post('/', createColumn)
router.get('/', getAllColumn)
router.put('/:id', updateColumn)
router.delete('/:id', deleteColumn)

export default router
