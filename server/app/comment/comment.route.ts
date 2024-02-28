import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth'
import { createComment, getComments, removeComment, updateComment } from './comment.controller'

const router = Router()

router.post('/', checkAuth, createComment)
router.get('/', checkAuth, getComments)
router.put('/:id', checkAuth, updateComment)
router.delete('/:id', checkAuth, removeComment)

export const commentRouter = router
