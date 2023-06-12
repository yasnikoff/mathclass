import { ReactNode } from "react"
import { Error } from "../features/errors/Error"
import { Loading } from "./Loading"
import { LoginScreen } from "../features/auth/Login"
import { useAuth } from "../features/auth/authHooks"
import { useAppDispatch } from "../app/hooks"
import { setErrorMessage } from "../features/errors/errorsActions"
import { UserRole } from "../features/users"

export type PageBaseProps = {
  children?: ReactNode
  requrieAuth: boolean
  isLoading?: boolean
  error?: unknown
  roles?: UserRole[]
}
export function PageBase(props: PageBaseProps) {
  const { user } = useAuth(props.requrieAuth)
  const dispatch = useAppDispatch()
  if (props.isLoading) {
    return <Loading></Loading>
  }
  if (props.requrieAuth && !user) {
    return <LoginScreen></LoginScreen>
  }
  if (
    props?.roles?.length &&
    !(user?.role && props.roles.some((role) => role === user.role))
  ) {
    dispatch(setErrorMessage(`access to page is not allowed`))
    return (
      <>
        <Error></Error>
      </>
    )
  }
  return (
    <>
      <Error></Error>
      {props.children}
    </>
  )
}
