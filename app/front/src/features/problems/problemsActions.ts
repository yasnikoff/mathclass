import api from "../../app/api"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { ProblemId, ProblemData } from "."

export type ProblemsListResponse = ProblemData[]
export type ProblemListRequest = { userId?: string }
export const problemsList = createAsyncThunk<
  ProblemsListResponse,
  ProblemListRequest
>("problems/list", async (req) => {
  const { data } = await api.get(`/problems`)
  return data
})

export type ProblemCreationResponse = ProblemData
export type ProblemCeateRequest = Pick<ProblemData, "math">
export const createProblem = createAsyncThunk<
  ProblemCreationResponse,
  ProblemCeateRequest
>("problems/new", async (newProblem) => {
  const { data } = await api.post(`/problems`, newProblem)
  return data
})

export type DeleteProblemResponse = { error?: string; id?: string }
export type DeleteProblemRequest = { id: string }
export const deleteProblem = createAsyncThunk<
  DeleteProblemResponse,
  DeleteProblemRequest
>("problems/delete", async (request) => {
  const { data } = await api.delete(`/problems/${request.id}`)
  return data
})

export const deleteMany = createAsyncThunk(
  "problems/deleteMany",
  async (problemsIds: ProblemId[]) => {
    await api.delete("/problems", { data: problemsIds })
  },
)

export const updateProblemList = createAction("problems/list")
export const selectProblem = createAction<ProblemId>("problems/select")
export const deselectProblem = createAction<ProblemId>("problems/deselect")
