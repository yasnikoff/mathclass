import { Card, ListGroup } from "react-bootstrap"
export function About() {
  return (
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
  )
}
