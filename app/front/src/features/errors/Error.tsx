import { Alert } from "react-bootstrap"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getErrorMessage } from "./errorsSelectors"
import { setErrorMessage } from "./errorsActions"

export function Error() {
  const dispatch = useAppDispatch()

  function dismiss() {
    dispatch(setErrorMessage(""))
  }

  const message = useAppSelector(getErrorMessage)
  if (message) {
    return (
      <Alert variant="danger" onClose={dismiss} dismissible>
        {message}
      </Alert>
    )
  }

  return <></>
}
