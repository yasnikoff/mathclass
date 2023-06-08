import { useEffect, useState } from "react"
import Problem from "./Problem"
import { ProblemId } from "."
import { Row, Col } from "react-bootstrap"
import { useAppDispatch } from "../../app/hooks"
import api from "../../app/api"
import { ProblemListItem } from "./problemsSlice"
import { selectProblem, deselectProblem } from "./problemsActions"

export type ProblemBoxProps = {
  item: ProblemListItem
  selectable: boolean
}

export function ProblemBox(props: ProblemBoxProps) {
  const dispatch = useAppDispatch()
  const id = props.item?.problem?.id

  // useEffect(() => {
  //   api.get(`problems/${id}`).then((resp) => setProblem(resp.data))
  // }, [id])

  const problem = props.item.problem
  const selected = props.item.selected
  function handleCheck() {
    selected ? dispatch(deselectProblem(id)) : dispatch(selectProblem(id))
  }
  const problemElem = problem ? <Problem data={problem}></Problem> : <div></div>
  // const problemElem = <Problem data={problem}></Problem>
  return (
    <div className="container my-4">
      <Row>
        <Col md={3} className={props.selectable ? "d-inline" : "d-none"}>
          <input
            className="form-check-input "
            disabled={!props?.item}
            type="checkbox"
            checked={selected}
            onChange={handleCheck}
          ></input>
        </Col>
        <Col md={9}>{problemElem}</Col>
      </Row>
    </div>
  )
}

export default ProblemBox
