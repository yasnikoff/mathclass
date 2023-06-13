import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string }
  console.error(error)

  return (
    <div id="error-page" className="text-center">
      <div className="d-block mt-5 mx-auto align-middle">
        <h1>Division by zero!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
