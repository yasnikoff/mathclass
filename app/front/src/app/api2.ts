import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { User } from "../features/users"
import { backendURL } from "./config"
import { AppState } from "./store"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, api) => {
      headers.set(
        "Authorization",
        `Bearer ${(api.getState() as AppState).auth.access_token}`,
      )
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserByName: builder.query<User, string>({
      query: (username) => `users/${username}`,
    }),
  }),
})

export const { useGetUserByNameQuery } = api
