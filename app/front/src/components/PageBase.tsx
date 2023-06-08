import { ReactNode } from "react"
import { PageError, Error } from "./Error"
import { Loading } from "./Loading"
import { LoginScreen } from "../features/auth/Login"
import { useAuth } from "../features/auth/authHooks"
import api from "../app/api"
import { Button } from "react-bootstrap"
export type PageBaseProps = {
  children: ReactNode
  requrieAuth: boolean
  isLoading: boolean
  error: PageError
}
export function PageBase(props: PageBaseProps) {
  async function getError() {
    await api.get("nosuchpage")
  }

  const { user } = useAuth()

  if (props.isLoading) {
    return <Loading></Loading>
  }
  if (props.requrieAuth && !user) {
    return <LoginScreen></LoginScreen>
  }
  return (
    <>
      <Error error={props.error}></Error>
      <Button variant="danger" onClick={getError}>
        Simulate error
      </Button>
      {props.children}
    </>
  )
}
