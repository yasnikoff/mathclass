import Button from "react-bootstrap/Button"
import { deleteProblem } from "./problemsActions"

import { useAppDispatch, useAppSelector } from "../../app/hooks"

export function EditProblems() {
  const { selected } = useAppSelector((state) => state.problems)
  const dispatch = useAppDispatch()

  function deleteSelected() {
    console.log(Object.keys(selected))
    for (const id of Object.keys(selected)) {
      dispatch(deleteProblem({ id }))
    }
  }

  return (
    <div>
      <Button className="btn btn-secondary" onClick={deleteSelected}>
        Delete
      </Button>
    </div>
  )
}
