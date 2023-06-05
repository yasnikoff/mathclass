import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { isAuthSaved } from "./authSlice"

export const useAuth = () => {
  const { loggedIn, user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!(loggedIn && isAuthSaved())) {
      navigate("/login")
    }
  }, [navigate, loggedIn])
  return user
}
