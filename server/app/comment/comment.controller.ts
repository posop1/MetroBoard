import { Request, Response } from 'express'
import { Comment } from './comment.model'
import { Task } from '../task'

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userId
    const { taskId, text } = req.body

    const newComment = new Comment({
      text,
      taskId,
      author: userId
    })
    await newComment.save()

    await Task.findByIdAndUpdate(taskId, {
      $push: { comments: newComment._id }
    })

    res.json(newComment)
  } catch (error) {
    console.log('create comment error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find()

    if (!comments) {
      return res.status(404).json({ message: 'comments not found' })
    }

    res.json(comments)
  } catch (error) {
    console.log('get comments error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { text } = req.body

    const comment = await Comment.findById(id)

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' })
    }

    comment.text = text

    await comment.save()

    res.json(comment)
  } catch (error) {
    console.log('update comment error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const comment = await Comment.findByIdAndRemove(id)
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' })
    }

    await Task.findByIdAndUpdate(comment.taskId, {
      $pull: { comments: comment._id }
    })

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log('remove comment error', error)
    res.status(400).json({ message: 'error' })
  }
}
