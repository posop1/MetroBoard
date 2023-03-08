import { Router } from 'express'
import { createColumn, getAllColumn, removeColumn, updateColumn } from '../controllers/column'
import { createTask, getTaskById, removeTask, updateTask } from '../controllers/task'

const router = Router()

router.get('/', getAllColumn)
router.post('/', createColumn)
router.get('/:columnId/task/:taskId', getTaskById)
router.post('/:columnId/task', createTask)
router.delete('/:columnId', removeColumn)
router.delete('/:columnId/task/:taskId', removeTask)
router.put('/:columnId', updateColumn)
router.put('/:columnId/task/:taskId', updateTask)

export default router
