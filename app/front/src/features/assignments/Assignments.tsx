import { PageBase } from "../../components/PageBase"
import ProblemBox from "../problems/ProblemBox"
import { Accordion } from "react-bootstrap"
import Loading from "../../components/Loading"
import {
  useGetAllAssignmentsQuery,
  useGetAllStudentsQuery,
} from "../../app/api2"
import { useAuth } from "../auth/authHooks"

export function Assignments() {
  const { user } = useAuth()
  console.dir(user)
  const param = user?.role === "Student" ? ({ studentId: user.id }) : {}
  console.dir(param)
  const { data, error, isLoading } = useGetAllAssignmentsQuery(param)
  const {
    data: students,
    error: studentsError,
    isLoading: isStudentsLoading,
  } = useGetAllStudentsQuery()

  let studentsList
  if (isStudentsLoading) studentsList = <Loading></Loading>
  if (students)
    studentsList = students.map((student) => (
      <div key={student.id}>{student.username}</div>
    ))

  let assigmentsList

  if (isLoading) assigmentsList = <Loading></Loading>
  if (data && data?.length > 0) {
    console.dir(data)
    assigmentsList = (
      <PageBase requrieAuth={true}>
        <Accordion>
          {data.map((assignment) => (
            <Accordion.Item key={assignment._id} eventKey={assignment._id}>
              <Accordion.Header>
                {assignment.caption} Student: {assignment?.student?.username}
              </Accordion.Header>
              <Accordion.Body>
                {assignment?.test.problems?.map((problem) => (
                  <ProblemBox
                    key={problem._id}
                    item={{ problem, selected: false }}
                  ></ProblemBox>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </PageBase>
    )
  }

  return (
    <PageBase>
      {/* {studentsList} */}
      {assigmentsList}
    </PageBase>
  )
}
