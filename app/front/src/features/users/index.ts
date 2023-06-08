export type UserRole = "Teacher" | "Student"

export interface User {
  id: string
  username: string
  role: UserRole
  email: string
  avatar: string
}
