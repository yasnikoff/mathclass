import LoginScreen from "./Login"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import Button from "react-bootstrap/Button"
import { userLogout } from "./authActions"

export function UserProfile() {
  const dispatch = useAppDispatch()

  const logout = async () => {
    dispatch(userLogout())
  }

  const { loggedIn, user } = useAppSelector((state) => state.auth)
  if (loggedIn) {
    return (
      // <Form>

      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="text-center">
            <div className="m-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                fill="currentColor"
                className="bi bi-file-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
              </svg>
              <div className="mb-2">{user?.username || ""}</div>
              <Button variant="primary" type="submit" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      // </Form>
    )
  } else {
    return <LoginScreen />
  }
}
