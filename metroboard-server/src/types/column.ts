import { ITask } from './task'

export interface IColumn {
  _id: string
  title: string
  tasks: ITask[]
  createdAt: Date
}
