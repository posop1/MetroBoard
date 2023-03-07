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

export interface iCreateTaskBody {
  title: string
  description: string
  author: string
  deadline?: Date
}
