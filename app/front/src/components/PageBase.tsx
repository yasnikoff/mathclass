import { ReactNode } from "react"
import { Error } from "../features/errors/Error"
import { Loading } from "./Loading"
import { LoginScreen } from "../features/auth/Login"
import { useAuth } from "../features/auth/authHooks"
import api from "../app/api"
import { Button } from "react-bootstrap"
export type PageBaseProps = {
  children: ReactNode
  requrieAuth: boolean
  isLoading: boolean
  error?: unknown
}
export function PageBase(props: PageBaseProps) {
  async function getError() {
    await api.get("nosuchpage")
  }

  console.dir(props)
  const { user } = useAuth()

  if (props.isLoading) {
    return <Loading></Loading>
  }
  if (props.requrieAuth && !user) {
    return <LoginScreen></LoginScreen>
  }
  return (
    <>
      <Error></Error>
      <Button variant="danger" onClick={getError} className="m-4">
        Simulate error
      </Button>
      {props.children}
    </>
  )
}
