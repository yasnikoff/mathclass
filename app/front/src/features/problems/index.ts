export interface ProblemData {
  id: ProblemId
  math: string
}
export const emptyProblem = {
  id: "",
  math: "",
}

export type ProblemId = string
