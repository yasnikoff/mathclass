import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"
import { ProblemListItem } from "./problemsSlice"
import { ProblemId, ProblemData } from "."

export const hasSelected = createSelector(
  (state: AppState) => state.problems.list,
  (list: ProblemListItem[]) => list.some((item) => item.selected),
)

export const selectedProblems = createSelector(
  (state: AppState) => state.problems.list,
  (list: ProblemListItem[]): ProblemId[] =>
    list.filter((item) => item.selected).map((item) => item.problem.id),
)

export function findById(id: ProblemId) {
  return createSelector(
    (state: AppState) => state.problems.list,
    (list: ProblemListItem[]): ProblemData | undefined => {
      const found = list
        .filter((item) => item.problem.id === id)
        .map((item) => item.problem)
      return found.length ? found[0] : undefined
    },
  )
}
