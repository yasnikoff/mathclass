import { createApi } from "@reduxjs/toolkit/query/react"
import type { User, UserId } from "../features/users"
import type { SignUpData, SignUpResponse } from "../features/auth/Signup"
import type { Assignment, NewAssignment } from "../features/assignments"
import { axiosBaseQuery } from "./api"

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
      query: (data) => ({ url: `assignments`, method: "POST", data }),
    }),
    getAllAssignments: builder.query<Assignment[], { studentId?: UserId }>({
      query: ({ studentId }) => ({
        url: `assignments` + (studentId ? `?student=${studentId}` : ""),
      }),
    }),
    saveAssignment: builder.mutation<Assignment, Assignment>({
      query: (data) => ({
        url: `assignments`,
        method: "PUT",
        data,
      }),
    }),
    saveSolution: builder.mutation<
      void,
      { assignmentId: string; problemIndex: number; solution: { math: string } }
    >({
      query: ({ assignmentId, problemIndex, solution }) => ({
        url: `assignments/${assignmentId}/${problemIndex}`,
        method: "PATCH",
        data: solution,
      }),
    }),
    submitAssignment: builder.mutation<void, { assignmentId: string }>({
      query: ({ assignmentId }) => ({
        url: `assignments/${assignmentId}/submit`,
        method: "PUT",
      }),
    }),

    saveMark: builder.query<
      void,
      { assignmentId: string; problemIndex: number; mark: number }
    >({
      query: ({ assignmentId, problemIndex, mark }) => ({
        url: `assignments/marks/${assignmentId}/${problemIndex}/${mark}`,
        method: "PUT",
      }),
    }),
  }),
})

export const {
  useGetUserByNameQuery,
  useLazyCreateNewUserQuery,
  useGetAllAssignmentsQuery,
  useLazyCreateAssignmentQuery,
  useLazySaveMarkQuery,
  useSaveAssignmentMutation,
  useGetAllStudentsQuery,
  useSaveSolutionMutation,
  useSubmitAssignmentMutation,
} = rtkQueryApi
