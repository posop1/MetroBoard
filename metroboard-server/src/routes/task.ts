import { Router } from 'express'
import { createTask, removeTask, getAllTask, getTaskById, updateTask } from '../controllers/task'

const router = Router()

router.post('/', createTask)
router.get('/', getAllTask)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', removeTask)

export default router
