import { createApi } from "@reduxjs/toolkit/query/react"
import type { User, UserId } from "../features/users"
import type { SignUpData, SignUpResponse } from "../features/auth/Signup"
import type { Assignment, NewAssignment } from "../features/assignments"
import { axiosBaseQuery } from "./api"
import { queries } from "@testing-library/dom"
export const rtkQueryApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Users

    createNewUser: builder.query<SignUpResponse, SignUpData>({
      query: (data) => ({ url: `users`, method: "POST", data }),
    }),
    getUserByName: builder.query<User, string>({
      query: (username) => ({ url: `users/${username}` }),
    }),
    getAllStudents: builder.query<User[], void>({
      query: () => ({ url: `users?role=Student` }),
    }),

    // Assignments

    createAssignment: builder.query<Assignment[], NewAssignment>({
      query: (data) => ({ url: `assignments`, method: "PUT", data }),
    }),
    getAllAssignments: builder.query<Assignment[], { studentId?: UserId }>({
      query: ({ studentId }) => ({
        url: `assignments` + (studentId ? `?student=${studentId}` : ""),
      }),
    }),
  }),
})

export const {
  useGetUserByNameQuery,
  useLazyCreateNewUserQuery,
  useGetAllAssignmentsQuery,
  useLazyCreateAssignmentQuery,
  useGetAllStudentsQuery,
} = rtkQueryApi
