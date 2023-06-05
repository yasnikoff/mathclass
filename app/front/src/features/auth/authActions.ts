import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import api from "../../app/api"

export type LoginResponse = {
  access_token: string
  user: { username: string; id: string }
}

export type LoginData = {
  username: string
  password: string
}

export const userLogin = createAsyncThunk<LoginResponse, LoginData>(
  "auth/login",
  async (loginData) => {
    const { data }: { data: LoginResponse } = await api.post(
      `/auth/login`,
      loginData,
    )

    return data
  },
)

export const unauthorized = createAction("auth/unauthorized")
export const userLogout = createAction("auth/logout")
export const restore = createAction("auth/restore")
