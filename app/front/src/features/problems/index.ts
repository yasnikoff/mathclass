export interface ProblemData {
  id: ProblemId
  caption: string
  math: string
}
export const emptyProblem = {
  id: "",
  caption: "",
  math: "",
}

export type ProblemId = string
