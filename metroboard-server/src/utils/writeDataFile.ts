import fs from 'fs'
import path from 'path'
import { ITask } from '../types/task'
import { IColumn } from '../types/column'

export const writeDataFile = (data: any) => {
  fs.writeFileSync(path.join(__dirname, '../../data/columnData.json'), JSON.stringify(data))
}
