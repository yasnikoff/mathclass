import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import logger from "redux-logger"
import authReducer from "../features/auth/authSlice"
import problemsReducer from "../features/problems/problemsSlice"
import testsReducer from "../features/tests/testsSlice"
import { unauthorizedErrorMiddleware } from "../features/auth/middleware"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemsReducer,
    tests: testsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(unauthorizedErrorMiddleware)
      .concat(logger)
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppState = ReturnType<typeof store.getState>
