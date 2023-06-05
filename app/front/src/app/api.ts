import axios from "axios"
import { store } from "./store"
import { backendURL } from "./config"
import { unauthorizedError } from "../utils/errors"
import { userLogout } from "../features/auth/authActions"
const api = axios.create({
  baseURL: backendURL,
})

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.access_token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "Application/json"
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(userLogout())
      return Promise.reject(unauthorizedError())
    }
    return Promise.reject(error)
  },
)

export default api
