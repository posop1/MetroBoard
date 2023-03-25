import { Router } from 'express'
import {
  createTask,
  getTaskById,
  getTaskComments,
  getTasks,
  removeTask,
  updateTask
} from './task.controller'
import { checkAuth } from '../../libs/checkAuth'

const router = Router()

router.post('/', checkAuth, createTask)
router.get('/', checkAuth, getTasks)
router.get('/:id', checkAuth, getTaskById)
router.put('/:id', checkAuth, updateTask)
router.delete('/:id', checkAuth, removeTask)
router.get('/:id/comments', checkAuth, getTaskComments)

export const taskRouter = router
