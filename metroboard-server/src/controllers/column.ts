import { Request, Response } from 'express'
import { getDataFile } from '../utils/getDataFile'
import { writeDataFile } from '../utils/writeDataFile'

export const createColumn = async (req: Request, res: Response) => {}

export const getAllColumn = async (req: Request, res: Response) => {
  const column = getDataFile()

  res.json(column)
}
