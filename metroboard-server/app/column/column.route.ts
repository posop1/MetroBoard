import { Router } from 'express'
import {
  createColumn,
  getColumns,
  getColumnsByBoardId,
  removeColumn,
  updateColumn
} from './column.controller'
import { checkAuth } from '../../libs/checkAuth'

const router = Router()

router.post('/', checkAuth, createColumn)
router.get('/', checkAuth, getColumns)
router.get('/:boardId', checkAuth, getColumnsByBoardId)
router.delete('/:id', checkAuth, removeColumn)
router.put('/:id', checkAuth, updateColumn)

export const columnRouter = router
