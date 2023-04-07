export interface IColumn {
  _id: string
  title: string
  boardId: string
  createdAt: Date
  updatedAt: Date
}

export interface IColumnState {
  columns: IColumn[]
  status: string | null
}
