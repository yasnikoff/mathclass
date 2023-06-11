import axios, { AxiosRequestConfig, AxiosError } from "axios"
import { store } from "./store"
import { backendURL } from "./config"
import { unauthorizedError } from "../utils/errors"
import { userLogout } from "../features/auth/authActions"
import { setErrorMessage } from "../features/errors/errorsActions"
import { BaseQueryFn } from "@reduxjs/toolkit/query"

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
    console.dir(error)
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) {
        store.dispatch(userLogout())
        return Promise.reject(unauthorizedError())
      }
      store.dispatch(
        setErrorMessage(error?.response?.data?.message || "unknown error"),
      )
    }

    return Promise.reject(error)
  },
)

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig["method"]
      data?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "get", data, params }) => {
    try {
      const result = await api({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export default api
