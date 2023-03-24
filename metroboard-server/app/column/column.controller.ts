import { Request, Response } from 'express'
import { Column } from './column.model'

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { title } = req.body

    const newColumn = new Column({
      title
    })

    await newColumn.save()

    res.json(newColumn)
  } catch (error) {
    console.log('create column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getColumns = async (req: Request, res: Response) => {
  try {
    const columns = await Column.find()

    if (!columns) {
      return res.status(404).json({ message: 'columns not found' })
    }

    res.json(columns)
  } catch (error) {
    console.log('get all column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title } = req.body

    const column = await Column.findById(id)

    if (!column) {
      return res.status(404).json({ message: 'column not found' })
    }

    column.title = title

    await column.save()

    res.json(column)
  } catch (error) {
    console.log('update column error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const column = await Column.findByIdAndRemove(id)

    if (!column) {
      return res.status(404).json({ message: 'column not found' })
    }

    res.json({ message: 'delete success' })
  } catch (error) {
    console.log('delete column error', error)
    res.status(400).json({ message: 'error' })
  }
}
