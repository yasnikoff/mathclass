import { PageBase } from "../../components/PageBase"
import { Accordion } from "react-bootstrap"
import { useAuth } from "../auth/authHooks"
import Loading from "../../components/Loading"
import { AssignmentBox } from "./AssignmentBox"
import { useGetAllAssignmentsQuery } from "../../app/api2"
import { Assignment } from "."

export function Assignments() {
  const { user } = useAuth()
  const isStudent = user?.role === "Student"
  const { data, isLoading } = useGetAllAssignmentsQuery(
    isStudent ? { studentId: user.id } : {},
  )

  let assignmentsList = <></>
  if (isLoading) assignmentsList = <Loading></Loading>
  if (data && data?.length > 0) {
    assignmentsList = (
      <Accordion>
        {data.map((assignment: Assignment) => (
          <AssignmentBox
            assignment={assignment}
            key={assignment._id}
          ></AssignmentBox>
        ))}
      </Accordion>
    )
  }

  return <PageBase requireAuth={true}>{assignmentsList}</PageBase>
}
