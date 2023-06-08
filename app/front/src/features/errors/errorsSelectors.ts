import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"

export const getErrorMessage = createSelector(
  (state: AppState) => state.errors.message,
  (message: string) => message,
)
