export interface ITask {
  _id: string
  title: string
  description: string
  author: string
  createdAt: Date
  deadline?: Date
}
