import { Router } from 'express'
import { checkAuth } from '../../libs/checkAuth'
import {
  createBoard,
  getBoardById,
  getBoards,
  getColumnsByBoardId,
  getTasksByBoardId,
  removeBoard,
  updateBoard
} from './board.controller'

const router = Router()

router.post('/', checkAuth, createBoard)
router.get('/', checkAuth, getBoards)
router.get('/:id', checkAuth, getBoardById)
router.put('/:id', checkAuth, updateBoard)
router.delete('/:id', checkAuth, removeBoard)
router.get('/:id/columns', checkAuth, getColumnsByBoardId)
router.get('/:id/tasks', checkAuth, getTasksByBoardId)

export const boardRouter = router
