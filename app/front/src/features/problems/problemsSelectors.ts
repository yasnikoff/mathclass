import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"
import { ProblemListItem } from "./problemsSlice"
import { ProblemId } from "."

export const hasSelected = createSelector(
  (state: AppState) => state.problems.list,
  (list: ProblemListItem[]) => list.some((item) => item.selected),
)

export const selectedProblems = createSelector(
  (state: AppState) => state.problems.list,
  (list: ProblemListItem[]): ProblemId[] =>
    list.filter((item) => item.selected).map((item) => item.id),
)
