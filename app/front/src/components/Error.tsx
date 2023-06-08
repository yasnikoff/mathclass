import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Alert } from "react-bootstrap"

export type PageError = FetchBaseQueryError | SerializedError | undefined

export type ErrorProps = {
  error: PageError
}

export function Error(props: ErrorProps) {
  const error = props.error
  let message: string = "Unknown error"
  if ((error as { error: string })?.error) {
    message = (error as { error: string })?.error || message
  } else if ((error as SerializedError)?.message) {
    message = (error as SerializedError)?.message || message
  }

  return (props.error && <Alert variant="error">{message}</Alert>) || <></>
}
