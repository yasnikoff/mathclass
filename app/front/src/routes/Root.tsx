import { Outlet, Link } from "react-router-dom"
import { AuthLink } from "../features/auth/Routing"
import { Navbar, Container, Nav } from "react-bootstrap"

export default function Root() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/about">Math class</Navbar.Brand>
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
