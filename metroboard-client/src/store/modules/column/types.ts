import { Commit } from 'vuex'

export interface IActionsParams {
  commit: Commit
}

export interface IColumn {
  _id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export interface IColumnState {
  columns: IColumn[]
  status: string | null
}
