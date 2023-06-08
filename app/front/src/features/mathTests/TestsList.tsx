import { useEffect } from "react"
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  ListGroup,
  Accordion,
} from "react-bootstrap"
import { deleteMany, testsList } from "./testsActions"
import { selectedTests } from "./testsSelectors"
import { useAuth } from "../auth/authHooks"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useSelector } from "react-redux"
import ProblemBox from "../problems/ProblemBox"
import { findById } from "../problems/problemsSelectors"
import { AppState } from "../../app/store"

export function TestsList() {
  const user = useAuth()

  const dispatch = useAppDispatch()
  const { list } = useAppSelector((state) => state.tests)
  const { list: problemsListItems } = useAppSelector(
    (state: AppState) => state.problems,
  )

  useEffect(() => {
    dispatch(testsList())
  }, [dispatch])

  const selecedTestsIds = useSelector(selectedTests)

  const testsElements =
    list &&
    list.map((item) => (
      <Accordion.Item key={item.id} eventKey={item.id}>
        <Accordion.Header>{item.caption}</Accordion.Header>
        <Accordion.Body>
          {item.problems.map((problemId) => (
            <ProblemBox
              key={problemId}
              item={{
                problem: problemsListItems
                  .filter((item) => item.problem.id === problemId)
                  .map((item) => item.problem)[0],
                selected: false,
              }}
              selectable={false}
            ></ProblemBox>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    ))

  return user ? (
    <div className="container">
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
  ) : (
    <></>
  )
}

export default TestsList
