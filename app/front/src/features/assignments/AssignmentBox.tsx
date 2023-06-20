import { Accordion, Container, Button, Spinner, Stack } from "react-bootstrap"
import { useAuth } from "../auth/authHooks"
import { SolutionBox } from "./SolutionBox"
import { Assignment } from "."
import { useSubmitAssignmentMutation } from "../../app/api2"
import { useState } from "react"

export type AssignmentBoxProps = {
  assignment: Assignment
}
export function AssignmentBox(props: AssignmentBoxProps) {
  const { user } = useAuth()
  const isStudent = user?.role === "Student"

  const [isSubmitted, setIsSubmitted] = useState(
    props?.assignment?.status && props?.assignment?.status !== "students_draft",
  )

  const [submitAssignmentTrigger, submitAssignmentResult] =
    useSubmitAssignmentMutation()

  async function submitAssignment() {
    if (!props.assignment) return

    await submitAssignmentTrigger({
      assignmentId: props?.assignment?._id,
    }).unwrap()

    setIsSubmitted(true)
  }

  const assignment = props.assignment

  const submitButton =
    isStudent && !isSubmitted ? (
      <>
        <Button type="button" onClick={submitAssignment}>
          {submitAssignmentResult.isLoading ? <Spinner></Spinner> : "Submit"}
        </Button>
      </>
    ) : (
      <></>
    )

  return (
    <Accordion.Item key={assignment._id} eventKey={assignment._id}>
      <Accordion.Header>
        <Stack direction="horizontal" gap={3}>
          <span className="p-2">Assignment:</span> <b>{assignment.caption}</b>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Stack direction="horizontal" className="my-2">
          <span>{submitButton}</span>
        </Stack>
        <Stack gap={3} className="mt-2">
          {assignment?.items?.map((item, index) => (
            <Container key={index}>
              <SolutionBox
                key={index}
                itemIndex={index}
                assignment={assignment}
                item={item}
              />
            </Container>
          ))}
        </Stack>
      </Accordion.Body>
    </Accordion.Item>
  )
}
