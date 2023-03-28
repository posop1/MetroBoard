import { Commit } from 'vuex'

export interface IActionsParams {
  commit: Commit
}

export interface ITask {
  _id: string
  title: string
  description: string
  author: string
  deadline?: Date
  columnId: string
  comments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ITaskState {
  tasks: ITask[]
  status: string | null
}
