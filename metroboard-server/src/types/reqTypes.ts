export interface IColumnBodyReq {
  title: string
}

export interface IGetTaskById {
  columnId: string
  taskId: string
}

export interface ICreateTaskParams {
  columnId: string
}

export interface ICreateTaskBody {
  title: string
  description: string
  author: string
  deadline?: Date
}

export interface IRemoveColumnTask {
  columnId: string
  taskId: string
}

export interface IRemoveColumn {
  columnId: string
}
