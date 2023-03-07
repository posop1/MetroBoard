import { Router } from 'express'
import {
  createColumn,
  createColumnTask,
  getAllColumn,
  getColumnTaskById
} from '../controllers/column'

const router = Router()

router.get('/', getAllColumn)
router.post('/', createColumn)
router.get('/:columnId/task/:taskId', getColumnTaskById)
router.post('/:columnId/task', createColumnTask)

export default router
