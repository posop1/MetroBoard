export interface IParamsId {
  id: string
}

// Column
export interface IColumnBodyReq {
  title: string
}
// Task
export interface ITaskBodyReq {
  title: string
  description: string
  author: string
  deadline?: Date
  columnId: string
}

// User
export interface ILoginReq {
  username: string
  password: string
}
