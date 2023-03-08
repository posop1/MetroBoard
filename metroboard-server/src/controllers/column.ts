import { Request, Response } from 'express'
import { getDataFile } from '../utils/getDataFile'
import { writeDataFile } from '../utils/writeDataFile'
import { IColumn } from '../types/column'
import {
  IColumnBodyReq,
  ICreateTaskParams,
  IGetTaskById,
  ICreateTaskBody,
  IRemoveColumn,
  IRemoveColumnTask
} from '../types/reqTypes'
import { uid } from 'uid'
import { ITask } from '../types/task'

export const createColumn = async (req: Request<never, never, IColumnBodyReq>, res: Response) => {
  try {
    const columnData = getDataFile()
    const { title } = req.body

    const newColumn: IColumn = {
      _id: uid(10),
      title,
      tasks: [],
      createdAt: new Date()
    }

    columnData.push(newColumn)
    writeDataFile(columnData)

    res.json(newColumn)
  } catch (error) {
    console.error('create column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getAllColumn = async (req: Request, res: Response) => {
  try {
    const columnData = getDataFile()

    res.json(columnData)
  } catch (error) {
    console.error('get all column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateColumn = async (req: Request, res: Response) => {}

export const getColumnTaskById = async (req: Request<IGetTaskById>, res: Response) => {
  try {
    const { columnId, taskId } = req.params

    const columnData = getDataFile()

    const column = columnData.find((item) => item._id === columnId)

    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    const task = column?.tasks.find((item) => item._id === taskId)

    res.json(task)
  } catch (error) {
    console.error('get column task by id error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const createColumnTask = async (
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

export const removeColumn = async (req: Request<IRemoveColumn>, res: Response) => {
  try {
    const { columnId } = req.params

    const columnData = getDataFile()

    const columnIndex = columnData.findIndex((item) => item._id === columnId)

    if (!columnIndex) {
      return res.status(400).json({ message: 'column not found' })
    }

    columnData.splice(columnIndex, 1)

    writeDataFile(columnData)

    res.json({ message: 'delete success' })
  } catch (error) {
    console.error('remove column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeColumnTask = async (req: Request<IRemoveColumnTask>, res: Response) => {
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

//TODO: updateColumn
