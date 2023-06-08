import { Outlet, Link } from "react-router-dom"
import { AuthLink } from "../features/auth/Routing"
import { Navbar, Container, Nav } from "react-bootstrap"
import { useAppDispatch } from "../app/hooks"
import { problemsList } from "../features/problems/problemsActions"
import { restore } from "../features/auth/authActions"
import { useAuth } from "../features/auth/authHooks"

export default function Root() {
  const dispatch = useAppDispatch()
  const user = useAuth()
  // if (user) {
  // dispatch(problemsList({ userId: user.id }))
  // }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/profile">Math class</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Item>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </Nav.Item> */}
            <Nav.Item>
              <AuthLink to={`problems`} className="nav-link">
                Problems
              </AuthLink>
            </Nav.Item>
            <Nav.Item>
              <AuthLink to={`tests`} className="nav-link">
                Tests
              </AuthLink>
            </Nav.Item>
            {/* <Nav.Item>
              <Link to={`about`} className="nav-link">
                About
              </Link>
            </Nav.Item> */}
            <Nav.Item>
              <AuthLink to={`profile`} className="nav-link">
                Profile
              </AuthLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}
