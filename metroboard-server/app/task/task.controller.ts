import { Request, Response } from 'express'
import { Task } from './task.model'
import { Comment } from '../comment'

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userId
    const { title, columnId, description } = req.body

    const newTask = new Task({
      title,
      columnId,
      author: userId,
      description
    })

    await newTask.save()

    res.json(newTask)
  } catch (error) {
    console.log('create task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()

    if (!tasks) {
      return res.status(404).json({ message: 'tasks not found' })
    }

    res.json(tasks)
  } catch (error) {
    console.log('get tasks error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    res.json(task)
  } catch (error) {
    console.log('get task by id error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, columnId } = req.body

    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    task.title = title
    task.description = description
    task.columnId = columnId

    task.save()

    res.json(task)
  } catch (error) {
    console.log('update task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const task = await Task.findByIdAndRemove(id)

    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log('remove task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTaskComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    const list = await Promise.all(
      task.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )

    res.json(list)
  } catch (error) {
    console.log('get task comments error', error)
    res.status(400).json({ message: 'error' })
  }
}
