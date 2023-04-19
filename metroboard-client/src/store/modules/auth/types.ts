import { Commit } from 'vuex'

export interface IUser {
  _id: string
  username: string
  password: string
  boards: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface AuthState {
  user: IUser | null
  token: string | null
  status: string | null
}

export interface IRegisterFetch {
  newUser: IUser
  token: string
}
export interface ILoginFetch {
  user: IUser
  token: string
}

export interface IActionsParams {
  commit: Commit
}

export interface IFetchParams {
  username: string
  password: string
}
