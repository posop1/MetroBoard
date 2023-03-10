import { Request, Response } from 'express'
import {
  ICreateColumnBody,
  IDeleteColumnParams,
  IUpdateColumnBody,
  IUpdateColumnParams
} from '../types/reqTypes'
import { getColumnData } from '../utils/getDataFile'
import { IColumn } from '../types/column'
import { uid } from 'uid'
import { writeColumnData } from '../utils/writeDataFile'

export const createColumn = async (
  req: Request<never, never, ICreateColumnBody>,
  res: Response
) => {
  try {
    const { title } = req.body
    const columnData = getColumnData()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    const newColumn: IColumn = {
      _id: uid(10),
      title,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    columnData.push(newColumn)

    writeColumnData(columnData)

    res.json(newColumn)
  } catch (error) {
    console.log('create column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getAllColumn = async (req: Request, res: Response) => {
  try {
    const columnData = getColumnData()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    res.json(columnData)
  } catch (error) {
    console.log('get all column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateColumn = async (
  req: Request<IUpdateColumnParams, never, IUpdateColumnBody>,
  res: Response
) => {
  try {
    const { id } = req.params
    const { title } = req.body

    const columnData = getColumnData()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    const column = columnData.find((column) => column._id === id)
    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    column.title = title
    column.updatedAt = new Date()

    writeColumnData(columnData)

    res.json(column)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error' })
  }
}

export const deleteColumn = async (req: Request<IDeleteColumnParams>, res: Response) => {
  try {
    const { id } = req.params
    const columnData = getColumnData()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    const columnId = columnData.findIndex((column) => column._id === id)
    if (!columnId) {
      return res.status(400).json({ message: 'column not found' })
    }

    columnData.splice(columnId, 1)

    writeColumnData(columnData)

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error' })
  }
}
