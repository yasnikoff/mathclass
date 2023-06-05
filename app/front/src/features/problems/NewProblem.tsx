import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Row, Col, ButtonGroup, Card } from "react-bootstrap"
import { ProblemData } from "."
import { useState } from "react"

import { createProblem, ProblemCeateRequest } from "./problemsActions"
import { useAppDispatch } from "../../app/hooks"
import Problem from "./Problem"

export type NewProblemProps = {
  closeHandle: () => void
}

export function NewProblem(props: NewProblemProps) {
  const { register, handleSubmit, reset } = useForm<ProblemData>()
  const [problem, setProblem] = useState({ caption: "", math: "" })

  const dispatch = useAppDispatch()

  const submitForm = async (data: ProblemCeateRequest) => {
    reset()
    setProblem({ caption: "", math: "" })
    dispatch(createProblem(data))
  }
  return (
    <Card>
      <Card.Body>
        {/* <Card.Title>New problem</Card.Title> */}

        <Form
          onSubmit={handleSubmit(submitForm)}
          className="mx-auto align-items-center"
        >
          <Row className="mt-2">
            <Col>
              <Row>
                <Form.Control
                  as="textarea"
                  placeholder="Type TeX here"
                  {...register("math")}
                  onChange={(e) =>
                    setProblem({
                      caption: problem.caption,
                      math: e.target.value,
                    })
                  }
                  required
                />
              </Row>
              <Row id="preview" className="my-2 ">
                <Problem data={problem}></Problem>
              </Row>
            </Col>
            <Col>
              <ButtonGroup vertical>
                <Button variant="outline-primary" type="submit">
                  Save
                </Button>
                <Button variant="outline-secondary" onClick={props.closeHandle}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default NewProblem
