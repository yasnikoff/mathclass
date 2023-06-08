import { SerializedError } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const UNAUTHORIZED = "Unauthorized"
export function unauthorizedError() {
  return { name: UNAUTHORIZED }
}
export function isUnathorizedError(error: any): boolean {
  return error?.name === UNAUTHORIZED
}

export function getErrorMessage(error: unknown): string {
  const defaultMsg = "Unknown error"

  if (error instanceof AxiosError) {
    if (error.response && error.response.data.message) {
      return error.response.data.message || defaultMsg
    } else {
      return error.message || defaultMsg
    }
  } else if ((error as { error: string })?.error) {
    return (error as { error: string })?.error || defaultMsg
  } else if ((error as SerializedError)?.message) {
    return (error as SerializedError)?.message || defaultMsg
  }
  return defaultMsg
}
