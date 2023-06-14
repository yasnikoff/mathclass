import { UserId, UserShort } from "../users"
import { ProblemData } from "../problems"

export type Solution = {
  _id: string

  problem: ProblemData

  math: string

  author: UserId
}

export type Assignment = {
  _id: string

  caption: string

  test: string

  student: UserShort

  teacher: UserShort

  items: AssignmentItem[]

  status: string
}

export type AssignmentItem = {
  problem: ProblemData
  solution: string
  status: "students_draft" | "rejected" | "accepted"
  mark: number
}

export type NewAssignment = Omit<
  Assignment,
  "_id" | "student" | "status" | "teacher" | "items"
> & { students: UserId[]; teacher: UserId }

export type StudentAssignmentsRequest = {
  userId?: UserId
}
