import { isUnathorizedError } from "../../utils/errors"
import { userLogout } from "./authActions"

export const unauthorizedErrorMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (isUnathorizedError(action?.payload)) {
      store.dispatch(userLogout())
    }
    return next(action)
  }

export const unauthorizedErrorInActionMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (action?.payload?.response?.status === 401) {
      store.dispatch(userLogout())
    }

    return next(action)
  }
