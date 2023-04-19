export interface IBoard {
  _id: string
  title: string
  columns: string[]
  tasks: string[]
  createdAt: Date
  updatedAt: Date
}

export interface IBoardState {
  boards: IBoard[]
  status: string | null
}
