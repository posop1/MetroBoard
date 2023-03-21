import { Request, Response } from 'express'
import { IParamsId, IColumnBodyReq } from '../types/reqTypes'
import { IColumn } from '../types/column'
import { uid } from 'uid'
import { getData } from '../utils/getDataFile'
import { writeData } from '../utils/writeDataFile'

export const createColumn = async (req: Request<never, never, IColumnBodyReq>, res: Response) => {
  try {
    const { title } = req.body
    const columnData = getData.column()

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

    writeData.column(columnData)

    res.json(newColumn)
  } catch (error) {
    console.log('create column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getAllColumn = async (req: Request, res: Response) => {
  try {
    const columnData = getData.column()

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
  req: Request<IParamsId, never, IColumnBodyReq>,
  res: Response
) => {
  try {
    const { id } = req.params
    const { title } = req.body

    const columnData = getData.column()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    const column = columnData.find((column) => column._id === id)
    if (!column) {
      return res.status(400).json({ message: 'column not found' })
    }

    column.title = title
    column.updatedAt = new Date()

    writeData.column(columnData)

    res.json(column)
  } catch (error) {
    console.log('update column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const deleteColumn = async (req: Request<IParamsId>, res: Response) => {
  try {
    const { id } = req.params
    const columnData = getData.column()

    if (!columnData) {
      return res.status(400).json({ message: 'column data not found' })
    }

    const columnId = columnData.findIndex((column) => column._id === id)
    if (!columnId) {
      return res.status(400).json({ message: 'column not found' })
    }

    columnData.splice(columnId, 1)

    writeData.column(columnData)

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log('delete column error', error)
    res.status(400).json({ message: 'error' })
  }
}
