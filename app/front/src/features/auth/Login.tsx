import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { userLogin } from "./authActions"
import { useNavigate } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

type LoginData = {
  username: string
  password: string
}

export function LoginScreen() {
  const { register, handleSubmit } = useForm<LoginData>()

  const { loading, loggedIn, success } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) navigate("/problems")
  })

  const submitForm = async (data: LoginData) => {
    dispatch(userLogin(data))
  }

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Login</Card.Title>

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
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Login"}
            </Button>
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
            <ListGroup.Item>
              username : <b>john</b>
            </ListGroup.Item>
            <ListGroup.Item>
              password: <b>johnspass</b>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )
}
export default LoginScreen
