import {
  Form,
  Container,
  Card,
  Button,
  ButtonGroup,
  Row,
  Spinner,
} from "react-bootstrap"
import { Problem } from "../problems/Problem"
import { useState } from "react"
import { useAuth } from "../auth/authHooks"
import { useLazySaveSolutionQuery } from "../../app/api2"
import { Assignment, AssignmentItem } from "."

export type SolutionBoxProps = {
  //   onSave: (solution: string) => void
  assignmnet: Assignment
  itemIndex: number
  item: AssignmentItem
}

export function SolutionBox(props: SolutionBoxProps) {
  const [solution, setSolution] = useState(props.item.solution)
  const [status, setStatus] = useState(props.item.status)
  const { user } = useAuth()
  const [trigger, result] = useLazySaveSolutionQuery()

  async function save() {
    // await props.onSave(solution)
    await trigger(
      {
        assignmentId: props.assignmnet._id,
        problemIndex: props.itemIndex,
        solution: { math: solution },
      },
      true,
    ).unwrap()
  }

  return (
    <Container>
      <Card>
        <Form>
          <Card.Header>
            <Form.Group>
              <Problem data={props.item.problem}></Problem>
            </Form.Group>
            <div className="my-1">{status}</div>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Solution:</Form.Label>
              <Problem data={{ math: solution }}></Problem>
              {user?.role === "Student" && (
                <Form.Control
                  className="my-4"
                  as="textarea"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                ></Form.Control>
              )}
            </Form.Group>
            <Row className="my-2">
              {user?.role === "Student" && (
                <Form.Group>
                  <Button type="submit" onClick={save}>
                    {result?.isLoading ? <Spinner></Spinner> : "Save"}
                  </Button>
                </Form.Group>
              )}
              {user?.role === "Teacher" && solution && (
                <Form.Group>
                  <ButtonGroup>
                    <Button type="submit" onClick={() => setStatus("accepted")}>
                      Approve
                    </Button>
                    <Button type="submit" onClick={() => setStatus("rejected")}>
                      Reject
                    </Button>
                  </ButtonGroup>
                </Form.Group>
              )}
            </Row>
          </Card.Body>
        </Form>
      </Card>
    </Container>
  )
}
