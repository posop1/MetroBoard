import { Request, Response } from 'express'
import {
  ICreateTaskBody,
  ICreateTaskParams,
  IGetTaskById,
  IRemoveColumnTask,
  IUpdateTaskBody,
  IUpdateTaskParams
} from '../types/reqTypes'
import { getDataFile } from '../utils/getDataFile'
import { writeDataFile } from '../utils/writeDataFile'
import { uid } from 'uid'
import { ITask } from '../types/task'

export const createTask = async (
  req: Request<ICreateTaskParams, never, ICreateTaskBody>,
  res: Response
) => {
  try {
    const { columnId } = req.params
    const { title, author, description } = req.body

    const columnData = getDataFile()

    const column = columnData.find((item) => item._id === columnId)

    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    const newTask: ITask = {
      _id: uid(10),
      title,
      description,
      author,
      createdAt: new Date(),
      deadline: new Date()
    }

    column.tasks.push(newTask)

    writeDataFile(columnData)

    res.json(newTask)
  } catch (error) {
    console.error('create column task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTaskById = async (req: Request<IGetTaskById>, res: Response) => {
  try {
    const { columnId, taskId } = req.params

    const columnData = getDataFile()

    const column = columnData.find((item) => item._id === columnId)

    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    const task = column.tasks.find((item) => item._id === taskId)

    res.json(task)
  } catch (error) {
    console.error('get column task by id error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeTask = async (req: Request<IRemoveColumnTask>, res: Response) => {
  try {
    const { columnId, taskId } = req.params

    const columnData = getDataFile()

    const column = columnData.find((item) => item._id === columnId)

    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    const taskIndex = column.tasks.findIndex((item) => item._id === taskId)

    column.tasks.splice(taskIndex, 1)

    writeDataFile(columnData)

    res.json({ message: 'delete success' })
  } catch (error) {
    console.error('remove task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateTask = async (
  req: Request<IUpdateTaskParams, never, IUpdateTaskBody>,
  res: Response
) => {
  try {
    const { columnId, taskId } = req.params
    const { description, title, deadline } = req.body

    const columnData = getDataFile()

    const column = columnData.find((item) => item._id === columnId)
    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    const task = column.tasks.find((item) => item._id === taskId)
    if (!task) {
      return res.status(400).json({ message: 'task not found' })
    }

    task.title = title
    task.description = description
    if (task.deadline) {
      task.deadline = deadline
    }

    writeDataFile(columnData)

    res.json(task)
  } catch (error) {
    console.error('update task error', error)
    res.status(400).json({ message: 'error' })
  }
}
