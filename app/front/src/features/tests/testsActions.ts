import api from "../../app/api"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { TestId, TestData, TestBriefData } from "."
import { ProblemId } from "../problems"

export type TestListResponse = TestData[]
export const testsList = createAsyncThunk<TestListResponse, void>(
  "tests/list",
  async (req) => {
    const { data } = await api.get(`/tests`)
    return data
  },
)

export type TestCreationResponse = TestData
export type TestCeateRequest = Pick<TestData, "caption"> & {
  problems: ProblemId[]
}
export const createTest = createAsyncThunk<
  TestCreationResponse,
  TestCeateRequest
>("tests/new", async (newTest) => {
  const { data } = await api.post(`/tests`, newTest)
  return data
})

export type DeleteTestResponse = { id?: string }
export type DeleteTestRequest = { id: string }
export const deleteTest = createAsyncThunk<
  DeleteTestResponse,
  DeleteTestRequest
>("tests/delete", async (request) => {
  const { data } = await api.delete(`/tests/${request.id}`)
  return data
})

export const deleteMany = createAsyncThunk(
  "tests/deleteMany",
  async (testIds: TestId[]) => {
    await api.delete("/tests", { data: testIds })
  },
)

export const updateTestsList = createAction("tests/list")
export const selectTest = createAction<TestId>("tests/select")
export const deselectTest = createAction<TestId>("tests/deselect")
