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
import { useLazySaveSolutionQuery, useLazySaveMarkQuery } from "../../app/api2"
import { Assignment, AssignmentItem } from "."

export type SolutionBoxProps = {
  //   onSave: (solution: string) => void
  assignmnet: Assignment
  itemIndex: number
  item: AssignmentItem
}

export function SolutionBox(props: SolutionBoxProps) {
  const [solution, setSolution] = useState(props.item.solution)
  const [mark, setMark] = useState(props.item.mark)
  const [status, setStatus] = useState(props.item.status)
  const { user } = useAuth()
  const [trigger, result] = useLazySaveSolutionQuery()
  const [saveMarkTrigger, saveMarkResult] = useLazySaveMarkQuery()

  async function save(e) {
    e.preventDefault()
    e.target.disabled = true
    await trigger(
      {
        assignmentId: props.assignmnet._id,
        problemIndex: props.itemIndex,
        solution: { math: solution },
      },
      true,
    ).unwrap()
  }

  async function saveMark(e) {
    e.preventDefault()
    e.target.disabled = true
    await saveMarkTrigger(
      {
        assignmentId: props.assignmnet._id,
        problemIndex: props.itemIndex,
        mark,
      },
      false,
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
                  <Button onClick={save}>
                    {result?.isLoading ? <Spinner></Spinner> : "Save solution"}
                  </Button>
                </Form.Group>
              )}
              <Form.Group style={{ width: "150px" }}>
                {user?.role === "Teacher" && solution && (
                  <>
                    <Form.Label className="ml-2 mt-2">Mark:</Form.Label>
                    <Form.Control
                      className="my-4"
                      as="input"
                      value={mark}
                      onChange={(e) => setMark(parseInt(e.target.value))}
                    ></Form.Control>
                    <Button onClick={saveMark}>
                      {saveMarkResult?.isLoading ? (
                        <Spinner></Spinner>
                      ) : (
                        "Set Mark"
                      )}
                    </Button>
                  </>
                )}
                {user?.role === "Student" && mark > 0 && (
                  <>
                    <Form.Label className="ml-2 mt-2">Mark:</Form.Label>
                    <span className="ml-2">{mark}</span>
                  </>
                )}
              </Form.Group>
            </Row>
          </Card.Body>
        </Form>
      </Card>
    </Container>
  )
}
