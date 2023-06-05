import { Route, Navigate, Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { ReactNode } from "react"

type AuthLinkProps = {
  to: string
  children: ReactNode
  className: string
}

const AuthLink = ({ to, children, className }: AuthLinkProps) => {
  const { loggedIn } = useAppSelector((state) => state.auth)

  return loggedIn ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <Link to="/login" className={className}>
      {children}
    </Link>
  )
}

export { AuthLink }
