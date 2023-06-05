import { AxiosError } from "axios"

export const UNAUTHORIZED = "Unauthorized"
export function unauthorizedError() {
  return { name: UNAUTHORIZED }
}
export function isUnathorizedError(error: any): boolean {
  return error?.name === UNAUTHORIZED
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data.message) {
      return error.response.data.message
    } else {
      return error.message
    }
  } else {
    return "unknown error"
  }
}
