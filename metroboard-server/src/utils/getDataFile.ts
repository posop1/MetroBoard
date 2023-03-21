import fs from 'fs'
import path from 'path'
import { IColumn } from '../types/column'
import { ITask } from '../types/task'
import { IUser } from '../types/auth'


export const getData = {
  column() {
    const data = fs.readFileSync(path.join(__dirname, '../../data/columnData.json'), 'utf8')
    const column: IColumn[] = JSON.parse(data)

    return column
  },
  task() {
    const data = fs.readFileSync(path.join(__dirname, '../../data/taskData.json'), 'utf8')
    const task: ITask[] = JSON.parse(data)

    return task
  },
  user() {
    const data = fs.readFileSync(path.join(__dirname, '../../data/userData.json'), 'utf8')
    const user: IUser[] = JSON.parse(data)

    return user
  }
}
