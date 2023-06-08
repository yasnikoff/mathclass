import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { PageError, Error } from "./Error"
import { Loading } from "./Loading"
import { LoginScreen } from "../features/auth/Login"
import { useAppSelector } from "../app/hooks"
import { AppState } from "../app/store"
import { useAuth } from "../features/auth/authHooks"
export type PageBaseProps = {
  children: ReactNode
  requrieAuth: boolean
  isLoading: boolean
  error: PageError
}
export function PageBase(props: PageBaseProps) {
  
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
      {props.children}
    </>
  )
}
