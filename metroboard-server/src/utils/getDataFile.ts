import fs from 'fs'
import path from 'path'
import { IColumn } from '../types/column'
import { ITask } from '../types/task'

export const getDataFile = (type: 'task' | 'column'): IColumn[] | ITask[] | undefined => {
  if (type === 'column') {
    const data = fs.readFileSync(path.join(__dirname, '../../data/columnData.json'), 'utf8')
    const column = JSON.parse(data)

    return column
  } else if (type === 'task') {
    const data = fs.readFileSync(path.join(__dirname, '../../data/taskData.json'), 'utf8')
    const task = JSON.parse(data)

    return task
  }
}
