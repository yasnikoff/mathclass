import { createApi } from "@reduxjs/toolkit/query/react"
import type { User } from "../features/users"

import { axiosBaseQuery } from "./api"
export const rtkQueryApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUserByName: builder.query<User, string>({
      query: (username) => ({ url: `users/${username}` }),
    }),
  }),
})

export const { useGetUserByNameQuery } = rtkQueryApi
