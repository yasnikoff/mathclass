import Latex from "react-latex"
import { Row, Col } from "react-bootstrap"
import { ProblemData } from "."
type ProblemProps = { data: Partial<ProblemData> }

export function Problem(props: ProblemProps) {
  return (
    <>
      <Row>
        {/* <Col>{props.data?.caption || ""}</Col> */}
        <Col>
          {/* <BlockMath math={props.data?.math || ""}></BlockMath> */}
          <Latex>{props.data?.math}</Latex>
        </Col>
      </Row>
    </>
  )
}

export default Problem
