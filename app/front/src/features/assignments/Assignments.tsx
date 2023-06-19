import { PageBase } from "../../components/PageBase"
import { Accordion, Container } from "react-bootstrap"
import Loading from "../../components/Loading"
import { SolutionBox } from "./SolutionBox"
import { useGetAllAssignmentsQuery } from "../../app/api2"
import { useAuth } from "../auth/authHooks"

export function Assignments() {
  const { user } = useAuth()
  const isStudent = user?.role === "Student"
  const param = isStudent ? { studentId: user.id } : {}

  const { data, isLoading } = useGetAllAssignmentsQuery(param)

  let assignmentsList = <></>
  if (isLoading) assignmentsList = <Loading></Loading>
  if (data && data?.length > 0) {
    assignmentsList = (
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
                    item={item}
                  />
                </Container>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  }

  return <PageBase requireAuth={true}>{assignmentsList}</PageBase>
}
