import { Commit } from 'vuex'

export interface IActionsParams {
  commit: Commit
}

export enum IStatus {
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export interface ISideLinks {
  to: string
  name: string
  icon: string
}
