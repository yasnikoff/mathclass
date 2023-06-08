import { Spinner, Container } from "react-bootstrap"

export function Loading() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Spinner></Spinner>
    </Container>
  )
}

export default Loading
