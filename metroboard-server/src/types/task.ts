export interface ITask {
  _id: string
  title: string
  description: string
  author: string
  deadline?: Date
  columnId: string
  createdAt: Date
  updatedAt: Date
}
