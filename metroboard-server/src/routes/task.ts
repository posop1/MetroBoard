import { Router } from 'express'
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from '../controllers/task'

const router = Router()

router.post('/', createTask)
router.get('/', getAllTask)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
