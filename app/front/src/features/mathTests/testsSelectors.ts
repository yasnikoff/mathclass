import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"
import { TestsListItem } from "./testsSlice"

export const hasSelected = createSelector(
  (state: AppState) => state.tests.list,
  (list: TestsListItem[]) => list.some((item) => item.selected),
)

export const selectedTests = createSelector(
  (state: AppState) => state.tests.list,
  (list: TestsListItem[]) =>
    list.filter((item) => item.selected).map((item) => item.id),
)
