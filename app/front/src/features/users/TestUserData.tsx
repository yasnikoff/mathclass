import { InputGroup, ListGroup, Form } from "react-bootstrap"
import { UserRole } from "."

export type TestUserDataProps = {
  username: string
  role: UserRole
  password: string
}

export function TestUserData(props: TestUserDataProps) {
  return (
    <ListGroup.Item>
      <InputGroup>
        <InputGroup.Text>{props.role}</InputGroup.Text>
        <Form.Control type="input" readOnly value={props.username} />
        <Form.Control type="input" readOnly value={props.password} />
      </InputGroup>
    </ListGroup.Item>
  )
}
