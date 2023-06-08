import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { isAuthSaved } from "./authSlice"
import { User } from "../users"
import { AppState } from "../../app/store"

export const useAuth = (): { user: User | undefined } => {
  const { loggedIn, user } = useAppSelector((state: AppState) => state.auth)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!(loggedIn && isAuthSaved())) {
  //     navigate("/login")
  //   }
  // }, [navigate, loggedIn])
  return { user }
}
