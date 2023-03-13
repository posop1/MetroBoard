export interface IUser {
  _id: string
  username: string
  password: string
}

export interface JwtPayload {
  id: string
}
