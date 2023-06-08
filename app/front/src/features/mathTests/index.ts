import { ProblemId } from "../problems"

export type TestId = string
export type TestData = {
  id: string
  caption: string
  problems: ProblemId[]
}

export type TestBriefData = Pick<TestData, "id" | "caption">
