import fs from 'fs'
import path from 'path'
import { IColumn } from '../types/column'
import { ITask } from '../types/task'
import { IUser } from '../types/auth'

export const writeData = {
  column(data: IColumn[]) {
    fs.writeFileSync(path.join(__dirname, '../../data/columnData.json'), JSON.stringify(data))
  },
  task(data: ITask[]) {
    fs.writeFileSync(path.join(__dirname, '../../data/taskData.json'), JSON.stringify(data))
  },
  user(data: IUser[]) {
    fs.writeFileSync(path.join(__dirname, '../../data/userData.json'), JSON.stringify(data))
  }
}
