import { useEffect, useState } from "react"
import ProblemBox from "./ProblemBox"
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap"
import NewProblem from "./NewProblem"
import { deleteMany, problemsList } from "./problemsActions"
import { createTest } from "../mathTests/testsActions"
import { selectedProblems, hasSelected } from "./problemsSelectors"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PageBase } from "../../components/PageBase"

export function ProblemList() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { list } = useAppSelector((state) => state.problems)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showNewTestDialog, setShowNewTestDialog] = useState(false)
  const handleCloseNewTestDialog = () => setShowNewTestDialog(false)
  const handleShowNewTestDialog = () => setShowNewTestDialog(true)

  const [newTestName, setNewTestName] = useState("")
  const createNewTest = () => {
    dispatch(createTest({ caption: newTestName, problems: selecedProblemsIds }))
    handleCloseNewTestDialog()
    navigate("/tests")
  }

  useEffect(() => {
    dispatch(problemsList({}))
  }, [dispatch])

  const selecedProblemsIds = useSelector(selectedProblems)
  const selectionNotEmpty = useSelector(hasSelected)

  const newProblemBox = show ? (
    <Row className="mb-3">
      <NewProblem closeHandle={handleClose}></NewProblem>
    </Row>
  ) : (
    <Row></Row>
  )

  const problems = list

  const problemElements =
    problems &&
    problems.map((item) => (
      <ListGroup.Item key={item.problem.id}>
        <ProblemBox item={item} selectable={true}></ProblemBox>
      </ListGroup.Item>
    ))

  return (
    <PageBase requrieAuth={true} roles={["Teacher"]}>
      <div className="container">
        <Row className="my-3">
          <Col>
            <ButtonGroup>
              <Button
                variant="secondary"
                onClick={handleShow}
                disabled={selectionNotEmpty}
              >
                Add
              </Button>

              <Button
                disabled={!selectionNotEmpty}
                variant="secondary"
                onClick={handleShowNewTestDialog}
              >
                Create Test
              </Button>
              <Button
                disabled={!selectionNotEmpty}
                variant="secondary"
                onClick={(_) => dispatch(deleteMany(selecedProblemsIds))}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {newProblemBox}

        <ListGroup>{problemElements}</ListGroup>

        <div>
          <Modal show={showNewTestDialog} onHide={handleCloseNewTestDialog}>
            <Modal.Header closeButton>
              <Modal.Title>New Test</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Label>
                  Test name:{" "}
                  <Form.Control
                    type="text"
                    onChange={(e) => setNewTestName(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNewTestDialog}>
                Cancel
              </Button>
              <Button variant="primary" onClick={createNewTest}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </PageBase>
  )
}

export default ProblemList
