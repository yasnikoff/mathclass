import { PageBase } from "../../components/PageBase"
import { Accordion, Container } from "react-bootstrap"
import Loading from "../../components/Loading"
import { SolutionBox } from "./SolutionBox"
import {
  useGetAllAssignmentsQuery,
  useSaveAssignmentMutation,
} from "../../app/api2"
import { useAuth } from "../auth/authHooks"
import { Assignment, AssignmentItem } from "."

export function Assignments() {
  const { user } = useAuth()
  const isStudent = user?.role === "Student"
  // const isTeacher = user?.role === "Teacher"
  const param = isStudent ? { studentId: user.id } : {}

  const { data, error, isLoading } = useGetAllAssignmentsQuery(param)

  const [triggerSave, saveResult] = useSaveAssignmentMutation()
  async function save(
    assignment: Assignment,
    item: AssignmentItem,
    solution: string,
  ) {
    item.solution = solution
    await triggerSave(assignment).unwrap()
  }

  let assigmentsList
  if (isLoading) assigmentsList = <Loading></Loading>
  if (data && data?.length > 0) {
    assigmentsList = (
      <PageBase requrieAuth={true}>
        <Accordion>
          {data.map((assignment) => (
            <Accordion.Item key={assignment._id} eventKey={assignment._id}>
              <Accordion.Header>
                <span className="p-2">Assignment:</span>{" "}
                <b>{assignment.caption}</b>
                <span className="p-2">Student:</span>{" "}
                <b>{assignment?.student?.username}</b>
              </Accordion.Header>
              <Accordion.Body>
                {assignment?.items?.map((item, index) => (
                  <Container className="my-2" key={index}>
                    <SolutionBox
                      key={index}
                      itemIndex={index}
                      assignment={assignment}
                      // onSave={(solution) => save(assignment, item, solution)}
                      item={item}
                    />
                  </Container>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </PageBase>
    )
  }

  return (
    <PageBase requrieAuth={true}>
      {/* {studentsList} */}
      {assigmentsList}
    </PageBase>
  )
}
