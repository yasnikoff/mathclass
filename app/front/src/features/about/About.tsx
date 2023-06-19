import { Card, Container } from "react-bootstrap"
export function About() {
  return (
    <Container style={{ width: "500px" }}>
      <Card className="mx-auto mt-5">
        <Card.Header>
          <Card.Title>Mathematics class</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            MathClass helps teachers manage list of math problems, create math
            tests and assign them to their students.
          </Card.Text>
          <Card.Text>
            There are two kinds of users of the MathClass: Teachers and
            Students. To try MathClass, please, <a href="/login">login</a> as
            one of the demo users or <a href="/signup">create</a> a new user.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
