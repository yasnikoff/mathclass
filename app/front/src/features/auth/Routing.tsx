import { Link } from "react-router-dom"

import { ReactNode } from "react"
import { UserRole } from "../users"
import { useAuth } from "./authHooks"

type AuthLinkProps = {
  to: string
  children: ReactNode
  roles?: UserRole[]
  className: string
}

const AuthLink = ({ to, roles, children, className }: AuthLinkProps) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <Link to="/login" className={className}>
        {children}
      </Link>
    )
  }

  if (roles && roles.length > 0) {
    if (roles.some((role) => role === user.role)) {
      return (
        <Link to={to} className={className}>
          {children}
        </Link>
      )
    } else {
      return <></>
    }
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export { AuthLink }
