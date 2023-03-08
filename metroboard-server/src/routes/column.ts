import { Router } from 'express'
import {
  createColumn,
  createColumnTask,
  getAllColumn,
  getColumnTaskById,
  removeColumn,
  removeColumnTask
} from '../controllers/column'

const router = Router()

router.get('/', getAllColumn)
router.post('/', createColumn)
router.get('/:columnId/task/:taskId', getColumnTaskById)
router.post('/:columnId/task', createColumnTask)
router.delete('/:columnId', removeColumn)
router.delete('/:columnId/task/:taskId', removeColumnTask)

export default router
