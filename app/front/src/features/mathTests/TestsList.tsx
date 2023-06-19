import { useEffect } from "react"
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  ListGroup,
  Accordion,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { deleteMany, testsList } from "./testsActions"
import { selectedTests } from "./testsSelectors"
import { useAuth } from "../auth/authHooks"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useSelector } from "react-redux"
import ProblemBox from "../problems/ProblemBox"
import { PageBase } from "../../components/PageBase"
import { AppState } from "../../app/store"
import { problemsList } from "../problems/problemsActions"
import { setErrorMessage } from "../errors/errorsActions"
import {
  useLazyCreateAssignmentQuery,
  useGetAllStudentsQuery,
} from "../../app/api2"
import { NewAssignment } from "../assignments"
import { TestData } from "."

export function TestsList() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { list } = useAppSelector((state) => state.tests)
  const { list: problemsListItems } = useAppSelector(
    (state: AppState) => state.problems,
  )

  useEffect(() => {
    dispatch(problemsList({}))
    dispatch(testsList())
  }, [dispatch])

  const selecedTestsIds = useSelector(selectedTests)
  const { user } = useAuth()
  const {
    data: students,
    error: studentsError,
    isLoading: isStudentsLoading,
  } = useGetAllStudentsQuery()

  const [trigger, result] = useLazyCreateAssignmentQuery()

  const createAssignments = async (mathTest: TestData) => {
    if (students && user) {
      const newAssignment: NewAssignment = {
        caption: mathTest.caption,
        students: students.map((student) => student._id),
        teacher: user.id,
        test: mathTest._id,
      }
      try {
        await trigger(newAssignment).unwrap()
        navigate("/assignments")
      } catch (e) {
        dispatch(setErrorMessage((e as Error)?.message || "unkown error"))
      }
    }
  }

  const testsElements =
    list &&
    list.map((item) => (
      <Accordion.Item key={item.id} eventKey={item.id}>
        <Accordion.Header>{item.caption}</Accordion.Header>
        <Accordion.Body>
          <Row>
            <ol>
              {item.problems.map((problem) => (
                <li>
                  <ProblemBox
                    key={problem._id}
                    item={{ problem, selected: false }}
                    selectable={false}
                  ></ProblemBox>
                </li>
              ))}
            </ol>
          </Row>
          <Row>
            <Button onClick={(e) => createAssignments(item)}>
              Send to students
            </Button>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    ))

  return (
    <PageBase requireAuth={true} roles={["Teacher"]}>
      <div className="container">
        {/* <Row className="my-3">
          Students:{" "}
          {students?.map((student) => (
            <span className="nx-1">{student.username}</span>
          ))}
        </Row> */}
        <Row className="my-3">
          <Col>
            <ButtonGroup>
              {/* <Button
              variant="outline-danger"
              onClick={(_e) => dispatch(deleteMany(selecedTestsIds))}
            >
              Delete
            </Button> */}
            </ButtonGroup>
          </Col>
        </Row>

        <Accordion>{testsElements}</Accordion>
      </div>
    </PageBase>
  )
}

export default TestsList
