// import { MenuBar } from "./components/MenuBar"

import "./App.css"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import { restore as RestoreAuthState } from "./features/auth/authActions"
import { UserProfile } from "./features/users/UserProfile"
import ErrorPage from "./routes/Error"
import Root from "./routes/Root"
import Home from "./features/home/Home"
import { About } from "./features/about/About"
import ProblemList from "./features/problems/ProblemList"
import TestsList from "./features/mathTests/TestsList"
import LoginScreen from "./features/auth/Login"
import { useAppDispatch } from "./app/hooks"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route element={<About />} path="/" />,
      <Route element={<ProblemList />} path="problems" />,
      <Route element={<TestsList />} path="tests" />,
      {/* <Route element={<About />} path="about" /> */}
      <Route element={<UserProfile />} path="profile" />,
      <Route element={<LoginScreen />} path="login" />,
    </Route>,
  ),
)

function App() {
  const dispatch = useAppDispatch()
  dispatch(RestoreAuthState())
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
