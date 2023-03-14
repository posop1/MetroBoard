import { IColumn, IColumnState } from './types'

export const setColumn = (state: IColumnState, payload: { columns: IColumn[]; status: string }) => {
  state.columns = payload.columns
  state.status = payload.status
}

export const createColumn = (state: IColumnState, payload: { column: IColumn; status: string }) => {
  state.columns?.push(payload.column)
  state.status = payload.status
}

export const removeColumn = (state: IColumnState, payload: { column: IColumn; status: string }) => {
  state.columns = state.columns.filter((column) => column._id !== payload.column._id)
  state.status = payload.status
}

export const updateColumn = (state: IColumnState, payload: { column: IColumn; status: string }) => {
  const index = state.columns.findIndex((column) => column._id === payload.column._id)
  state.columns[index] = payload.column
}
