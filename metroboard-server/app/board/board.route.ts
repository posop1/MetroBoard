import { Router } from 'express'
import { checkAuth } from '../../libs/checkAuth'
import { createBoard, getBoardById, getBoards, removeBoard, updateBoard } from './board.controller'

const router = Router()

router.post('/', checkAuth, createBoard)
router.get('/', checkAuth, getBoards)
router.get('/:id', checkAuth, getBoardById)
router.put('/:id', checkAuth, updateBoard)
router.delete('/:id', checkAuth, removeBoard)

export const boardRouter = router
