import { Router } from 'express'
import { createColumn, getColumns, removeColumn, updateColumn } from './column.controller'
import { checkAuth } from '../utils/checkAuth'

const router = Router()

router.post('/', checkAuth, createColumn)
router.get('/', checkAuth, getColumns)
router.delete('/:id', checkAuth, removeColumn)
router.put('/:id', checkAuth, updateColumn)

export const columnRouter = router
