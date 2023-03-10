import fs from 'fs'
import path from 'path'
import { IColumn } from '../types/column'
import { ITask } from '../types/task'

export const getColumnData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../../data/columnData.json'), 'utf8')
  const column: IColumn[] = JSON.parse(data)

  return column
}

export const getTaskData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../../data/taskData.json'), 'utf8')
  const task: ITask[] = JSON.parse(data)

  return task
}
