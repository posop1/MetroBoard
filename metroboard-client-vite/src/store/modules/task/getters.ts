import { ITaskState } from './types'

export const getTasks = (state: ITaskState) => state.tasks

export const getTaskStatus = (state: ITaskState) => state.status
