import { useState } from "react"
import { useForm } from "react-hook-form"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import { useLazyCreateNewUserQuery } from "../../app/api2"
import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import { PageBase } from "../../components/PageBase"
import { UserRole } from "../users"
import { AvatarSelection } from "../users/AvatarSelection"
import { Avatar } from "../users/Avatar"

const PASSWORD_MIN_LENGTH = 5

export type SignUpData = {
  username: string
  password: string
  email?: string
  role: UserRole
  repeatPassword?: string
  avatar: string
}

export type SignUpResponse = Omit<SignUpData, "password">

export function SignUpScreen() {
  const { register, handleSubmit, formState, getValues } = useForm<SignUpData>()

  const [trigger, result] = useLazyCreateNewUserQuery()

  const navigate = useNavigate()

  const [avatarSvg, setAvataarSvg] = useState("")

  const submitForm = async (data: SignUpData) => {
    if (data.password !== data.repeatPassword) return
    delete data.repeatPassword
    if (!data.email || data.email === "") delete data.email
    data.avatar = avatarSvg
    try {
      await trigger(data).unwrap()
      navigate("/login")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <PageBase requrieAuth={false}>
      <Container
        style={{ width: "500px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Card className="mx-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Sign up</Card.Title>

            <Form
              onSubmit={handleSubmit(submitForm)}
              className="mx-auto text-left"
              style={{ width: "300px" }}
            >
              <Form.Group>
                <div className="d-flex justify-content-center align-items-center">
                  <Avatar svg={avatarSvg} width="100" height="100"></Avatar>
                </div>
                <AvatarSelection
                  onSelected={(e) => setAvataarSvg(e.svg)}
                ></AvatarSelection>
              </Form.Group>
              <Form.Group className="my-3" controlId="formUserName">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                  {...register("password", {
                    minLength: PASSWORD_MIN_LENGTH,
                    deps: ["repeatPassword"],
                  })}
                  required
                />
                <FieldError
                  message={formState?.errors?.password?.message}
                ></FieldError>
              </Form.Group>
              <Form.Group className="my-3" controlId="formRepeatPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Type the password here once again"
                  {...register("repeatPassword", {
                    minLength: PASSWORD_MIN_LENGTH,
                    validate: (value) => {
                      const { password } = getValues()
                      return password === value || "Passwords should match!"
                    },
                  })}
                  required
                />
                <FieldError
                  message={formState?.errors?.repeatPassword?.message}
                ></FieldError>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Select {...register("role")} required>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3" controlId="formUserName">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="yourname@example.com"
                  {...register("email")}
                  required={false}
                />
              </Form.Group>
              <Form.Group className="my-4">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    result.isLoading || Object.keys(formState.errors).length > 0
                  }
                >
                  {result.isLoading ? <Spinner /> : "Sign up"}
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </PageBase>
  )
}
export default SignUpScreen

function FieldError(props: { message: string | undefined }) {
  return (
    <p role="alert" className="feedback-invalid" style={{ color: "red" }}>
      {props.message || ""}
    </p>
  )
}
