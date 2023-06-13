import { ProblemData } from "../problems"

export type TestId = string
export type TestData = {
  id: string
  _id: string
  caption: string
  problems: ProblemData[]
}

export type TestBriefData = Pick<TestData, "id" | "caption">
