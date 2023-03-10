import { Request, Response } from 'express'
import { ITaskBodyReq, IParamsId } from '../types/reqTypes'
import { getTaskData } from '../utils/getDataFile'
import { uid } from 'uid'
import { ITask } from '../types/task'
import { writeTaskData } from '../utils/writeDataFile'

export const createTask = async (req: Request<never, never, ITaskBodyReq>, res: Response) => {
  try {
    const { title, author, columnId, description, deadline } = req.body
    const taskData = getTaskData()

    if (!taskData) {
      return res.status(400).json({ message: 'task data not found' })
    }

    if (deadline) {
      const newTaskWithDeadline: ITask = {
        _id: uid(10),
        title,
        description,
        author,
        deadline,
        columnId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      taskData.push(newTaskWithDeadline)

      writeTaskData(taskData)

      return res.json(newTaskWithDeadline)
    }

    const newTask = {
      _id: uid(10),
      title,
      description,
      author,
      columnId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    taskData.push(newTask)

    writeTaskData(taskData)

    res.json(newTask)
  } catch (error) {
    console.log('create task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const taskData = getTaskData()

    if (!taskData) {
      return res.status(400).json({ message: 'task data not found' })
    }

    res.json(taskData)
  } catch (error) {
    console.log('get all task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTaskById = async (req: Request<IParamsId>, res: Response) => {
  try {
    const { id } = req.params

    const taskData = getTaskData()
    if (!taskData) {
      return res.status(400).json({ message: 'task data not found' })
    }

    const task = taskData.find((task) => task._id === id)
    if (!task) {
      return res.status(400).json({ message: 'task not found' })
    }

    res.json(task)
  } catch (error) {
    console.log('get task by id error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateTask = async (req: Request<IParamsId, never, ITaskBodyReq>, res: Response) => {
  try {
    const { id } = req.params
    const { author, columnId, description, title, deadline } = req.body

    const taskData = getTaskData()
    if (!taskData) {
      return res.status(400).json({ message: 'task data not found' })
    }

    const task = taskData.find((task) => task._id === id)
    if (!task) {
      return res.status(400).json({ message: 'task not found' })
    }

    if (deadline) {
      task.author = author
      task.columnId = columnId
      task.deadline = deadline
      task.description = description
      task.title = title
      task.updatedAt = new Date()

      writeTaskData(taskData)

      return res.json(task)
    }

    task.author = author
    task.columnId = columnId
    task.description = description
    task.title = title
    task.updatedAt = new Date()

    writeTaskData(taskData)

    res.json(task)
  } catch (error) {
    console.log('update task error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const deleteTask = async (req: Request<IParamsId>, res: Response) => {
  try {
    const { id } = req.params

    const taskData = getTaskData()
    if (!taskData) {
      return res.status(400).json({ message: 'task data not found' })
    }

    const taskId = taskData.findIndex((task) => task._id === id)
    if (!taskId) {
      return res.status(400).json({ message: 'task not found' })
    }

    taskData.splice(taskId, 1)

    writeTaskData(taskData)

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log('delete task error', error)
    res.status(400).json({ message: 'error' })
  }
}
