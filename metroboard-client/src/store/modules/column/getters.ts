import { IColumnState } from './types'

export const getColumns = (state: IColumnState) => state.columns

export const getColumnStatus = (state: IColumnState) => state.status
