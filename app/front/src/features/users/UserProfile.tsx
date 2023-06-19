import { useAppDispatch } from "../../app/hooks"
import { Button, Container, Card, Row, Form } from "react-bootstrap"
import { userLogout } from "../auth/authActions"
import { Avatar } from "./Avatar"
import { PageBase } from "../../components/PageBase"
import { useGetUserByNameQuery } from "../../app/api2"
import { useAuth } from "../auth/authHooks"

export function UserProfile() {
  const dispatch = useAppDispatch()

  const logout = async () => {
    dispatch(userLogout())
  }

  const { user } = useAuth()
  const { data, error, isLoading } = useGetUserByNameQuery(user?.username || "")

  return (
    <PageBase isLoading={isLoading} error={error} requireAuth={true}>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="mt-5">
          <Card.Body>
            <Form className="my-1">
              <Row className="my-3" id="avatar">
                <Avatar svg={data?.avatar} width="120" height="120"></Avatar>
              </Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="input"
                  value={data?.username}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="input"
                  value={data?.role}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={data?.email}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={logout}
                className="mt-3 mx-auto"
              >
                Logout
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </PageBase>
  )
}
