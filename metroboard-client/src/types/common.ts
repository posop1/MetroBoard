import { Commit } from 'vuex'

export interface IActionsParams {
  commit: Commit
}

export enum IStatus {
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error'
}
