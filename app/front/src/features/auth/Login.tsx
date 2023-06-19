import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { PageBase } from "../../components/PageBase"
import { userLogin } from "./authActions"
import { useNavigate } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap"
import { testUsers } from "../users"
import { TestUserData } from "../users/TestUserData"
import { problemsList } from "../problems/problemsActions"

type LoginData = {
  username: string
  password: string
}

export function LoginScreen() {
  const { register, handleSubmit } = useForm<LoginData>()

  const { loading, loggedIn, success, user } = useAppSelector(
    (state) => state.auth,
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) navigate("/profile")
  }, [loggedIn, navigate])

  const submitForm = async (data: LoginData) => {
    await dispatch(userLogin(data))
    await dispatch(problemsList({ userId: user?.id }))
  }

  const signUp = async () => {
    await navigate("/signup")
  }

  return (
    <PageBase requireAuth={false}>
      <Container style={{ width: "500px" }}>
        <Card className="mx-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>

            <Form
              onSubmit={handleSubmit(submitForm)}
              className="mx-auto text-left"
              style={{ width: "300px" }}
            >
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Login"}
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={signUp}>
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form>

            <div className={success ? "d-none" : "d-block mt-3 text-danger"}>
              Wrong username or password
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Test user credentials</Card.Header>
          <Card.Body>
            <ListGroup>
              {testUsers.map((user, index) => (
                <TestUserData {...user} key={index}></TestUserData>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </PageBase>
  )
}
export default LoginScreen
