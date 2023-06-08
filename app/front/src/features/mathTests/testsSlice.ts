import { SerializedError, createSlice } from "@reduxjs/toolkit"
import {
  testsList,
  createTest,
  deleteTest,
  deleteMany,
  DeleteTestResponse,
} from "./testsActions"
import { TestData } from "."

export type TestsListItem = TestData & { selected: boolean }

type TestsListState = {
  inSelectionMode: boolean
  list: TestsListItem[]
  loading: boolean
  success: boolean
  error?: SerializedError
}

const initialState: TestsListState = {
  inSelectionMode: false,
  list: [],
  loading: false,
  success: false,
  error: undefined,
}

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    select: (state: TestsListState, action) => {
      const id = action.payload
      state.list.forEach((item) => {
        if (item.id === id) {
          item.selected = true
        }
      })
    },
    deselect: (state: TestsListState, action) => {
      const id = action.payload
      state.list.forEach((item) => {
        if (item.id === id) {
          item.selected = false
        }
      })
    },
  },
  extraReducers: (builder) => {
    // list

    builder.addCase(testsList.pending, (state: TestsListState) => {
      state.loading = true
      state.error = undefined
      state.success = false
    })

    builder.addCase(testsList.fulfilled, (state: TestsListState, action) => {
      state.loading = false
      state.list = action.payload.map((data) => ({ ...data, selected: false }))
      state.success = true
    })

    builder.addCase(testsList.rejected, (state: TestsListState, action) => {
      state.loading = false
      state.success = false
      state.error = action.error
    })

    // add

    builder.addCase(createTest.fulfilled, (state: TestsListState, action) => {
      state.list.unshift({ ...action.payload, selected: false })
    })

    builder.addCase(
      deleteTest.fulfilled,
      (state: TestsListState, { payload }: { payload: DeleteTestResponse }) => {
        const foundIndex = state.list.findIndex(
          (item) => item.id === payload?.id,
        )
        state.list.splice(foundIndex, 1)
      },
    )

    // deleteMany
    builder.addCase(deleteMany.pending, (state: TestsListState) => {})

    builder.addCase(deleteMany.fulfilled, (state: TestsListState) => {
      state.list = state.list.filter((item) => !item.selected)
    })

    builder.addCase(deleteMany.rejected, (state: TestsListState, action) => {
      state.error = action.error
    })
  },
})

export default testsSlice.reducer
