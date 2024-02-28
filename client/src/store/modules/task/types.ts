export interface ITask {
  _id: string
  title: string
  description: string
  author: string
  deadline?: Date
  columnId: string
  boardId: string
  comments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ITaskState {
  tasks: ITask[]
  status: string | null
}
