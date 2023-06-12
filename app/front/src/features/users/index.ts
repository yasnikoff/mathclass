export type UserRole = "Teacher" | "Student"

export interface User {
  id: string
  username: string
  role: UserRole
  email?: string
  avatar?: string
}

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
