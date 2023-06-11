import { Alert } from "react-bootstrap"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getErrorMessage } from "./errorsSelectors"
import { setErrorMessage } from "./errorsActions"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export function Error() {
  const dispatch = useAppDispatch()

  function dismiss() {
    dispatch(setErrorMessage(""))
  }

  const location = useLocation()
  const message = useAppSelector(getErrorMessage)
  useEffect(() => {
    dispatch(setErrorMessage(""))
  }, [dispatch, location.pathname])

  if (message) {
    return (
      <Alert variant="danger" onClose={dismiss} dismissible>
        {message}
      </Alert>
    )
  }

  return <></>
}
