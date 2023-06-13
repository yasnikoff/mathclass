export type UserRole = "Teacher" | "Student"

export type UserId = string

export interface User {
  id: UserId
  _id: UserId
  username: string
  role: UserRole
  email?: string
  avatar?: string
}

export type UserShort = Pick<User, "id" | "_id" | "username" | "role">

export const testUsers: {
  username: string
  role: UserRole
  password: string
}[] = [
  {
    username: "john",
    role: "Teacher" as UserRole,
    password: "johnspass",
  },
  {
    username: "maria",
    role: "Student" as UserRole,
    password: "mariaspass",
  },
  {
    username: "anna",
    role: "Student" as UserRole,
    password: "annaspass",
  },
]
