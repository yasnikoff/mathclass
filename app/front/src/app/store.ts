import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import logger from "redux-logger"
import authReducer from "../features/auth/authSlice"
import problemsReducer from "../features/problems/problemsSlice"
import testsReducer from "../features/mathTests/testsSlice"
import usersReducer from "../features/users/usersSlice"
import {
  unauthorizedErrorMiddleware,
  unauthorizedErrorInActionMiddleware,
} from "../features/auth/middleware"
import { api } from "./api2"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    users: usersReducer,
    problems: problemsReducer,
    tests: testsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(unauthorizedErrorMiddleware)
      .concat(unauthorizedErrorInActionMiddleware)
      .concat(api.middleware)
      .concat(logger)
  },
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppState = ReturnType<typeof store.getState>
