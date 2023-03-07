import fs from 'fs'
import path from 'path'
import { IColumn } from '../types/column'

export const getDataFile = (): IColumn[] => {
  const data = fs.readFileSync(path.join(__dirname, '../../data/columnData.json'), 'utf8')
  const column = JSON.parse(data)

  return column
}
