import { createApi } from "@reduxjs/toolkit/query/react"
import type { User } from "../features/users"
import type { SignUpData, SignUpResponse } from "../features/auth/Signup"
import { axiosBaseQuery } from "./api"
export const rtkQueryApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createNewUser: builder.query<SignUpResponse, SignUpData>({
      query: (data) => ({ url: `users`, method: "POST", data }),
    }),
    getUserByName: builder.query<User, string>({
      query: (username) => ({ url: `users/${username}` }),
    }),
    getAllStudents: builder.query<User[], void>({
      query: () => ({ url: `users?role=Student` }),
    }),
  }),
})

export const { useGetUserByNameQuery, useLazyCreateNewUserQuery } = rtkQueryApi
