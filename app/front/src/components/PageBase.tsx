import { ReactNode } from "react"
import { Error } from "../features/errors/Error"
import { Loading } from "./Loading"
import { LoginScreen } from "../features/auth/Login"
import { useAuth } from "../features/auth/authHooks"

export type PageBaseProps = {
  children?: ReactNode
  requrieAuth: boolean
  isLoading?: boolean
  error?: unknown
}
export function PageBase(props: PageBaseProps) {
  const { user } = useAuth(props.requrieAuth)

  if (props.isLoading) {
    return <Loading></Loading>
  }
  if (props.requrieAuth && !user) {
    return <LoginScreen></LoginScreen>
  }
  return (
    <>
      <Error></Error>
      {props.children}
    </>
  )
}
