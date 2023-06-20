import { Form, Container, Card, Button, Row, Spinner } from "react-bootstrap"
import { Problem } from "../problems/Problem"
import { useState, MouseEvent, useRef } from "react"
import { useAuth } from "../auth/authHooks"
import { useSaveSolutionMutation, useLazySaveMarkQuery } from "../../app/api2"
import { Assignment, AssignmentItem } from "."

export type SolutionBoxProps = {
  assignment: Assignment
  itemIndex: number
  item: AssignmentItem
}

export function SolutionBox(props: SolutionBoxProps) {
  const [solution, setSolution] = useState(props.item.solution)
  const [mark, setMark] = useState(props.item.mark)
  const { user } = useAuth()
  const [trigger, saveSolutionResult] = useSaveSolutionMutation()
  const [savedSolution, setSavedSolution] = useState(props.item.solution)
  const [saveMarkTrigger, saveMarkResult] = useLazySaveMarkQuery()

  const formRef = useRef<HTMLFormElement>(null)

  const isDirty = savedSolution !== solution
  const isEditable =
    !props.assignment?.status || props.assignment.status === "students_draft"

  async function save(e: MouseEvent<HTMLButtonElement>) {
    await trigger({
      assignmentId: props.assignment._id,
      problemIndex: props.itemIndex,
      solution: { math: solution },
    }).unwrap()
    setSavedSolution(solution)
  }

  async function saveMark(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    target.disabled = true
    await saveMarkTrigger(
      {
        assignmentId: props.assignment._id,
        problemIndex: props.itemIndex,
        mark,
      },
      false,
    ).unwrap()
  }

  return (
    <Container>
      <Card>
        <Form ref={formRef}>
          <Card.Header>
            <Form.Group>
              <Problem data={props.item.problem}></Problem>
            </Form.Group>
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
                  disabled={!isEditable}
                  onChange={(e) => setSolution(e.target.value)}
                ></Form.Control>
              )}
            </Form.Group>
            <Row className="my-2">
              {user?.role === "Student" && (
                <Form.Group>
                  <Button
                    type="button"
                    onClick={save}
                    disabled={!isDirty || !isEditable}
                  >
                    {saveSolutionResult?.isLoading ? (
                      <Spinner></Spinner>
                    ) : (
                      "Save"
                    )}
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
