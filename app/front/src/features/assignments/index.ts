import { UserId } from "../users"
import { ProblemData as Problem } from "../problems"
import { TestData as Test } from "../mathTests"

export type Solution = {
  _id: string

  problem: Problem

  math: string

  author: UserId
}

export type Assignment = {
  _id: string

  caption: string

  test: string

  student: UserId

  teacher: UserId

  solutions: Solution[]

  status: string
}

export type NewAssignment = Omit<
  Assignment,
  "_id" | "student" | "solutions" | "status"
> & { students: UserId[] }

export type StudentAssignmentsRequest = {
  userId?: UserId
}
