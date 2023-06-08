import { SerializedError, createSlice } from "@reduxjs/toolkit"
import {
  problemsList,
  createProblem,
  deleteProblem,
  deleteMany,
  DeleteProblemResponse,
} from "./problemsActions"
import { ProblemData } from "."

export type ProblemListItem = {
  problem: ProblemData
  selected: boolean
}

type ProblemsListState = {
  inSelectionMode: boolean
  list: ProblemListItem[]
  loading: boolean
  success: boolean
  error?: SerializedError
}

const initialState: ProblemsListState = {
  inSelectionMode: false,
  list: [],
  loading: false,
  success: false,
  error: undefined,
}

const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    enterProblemSelectionMode: (state: ProblemsListState) => {
      state.inSelectionMode = true
    },
    leaveProblemSelectionMode: (state: ProblemsListState) => {
      state.inSelectionMode = false
    },
    select: (state: ProblemsListState, action) => {
      const id = action.payload
      state.list.forEach((item) => {
        if (item.problem.id === id) {
          item.selected = true
        }
      })
    },
    deselect: (state: ProblemsListState, action) => {
      const id = action.payload
      state.list.forEach((item) => {
        if (item.problem.id === id) {
          item.selected = false
        }
      })
    },
  },
  extraReducers: (builder) => {
    // list

    builder.addCase(problemsList.pending, (state: ProblemsListState) => {
      state.loading = true
      state.error = undefined
      state.success = false
    })

    builder.addCase(
      problemsList.fulfilled,
      (state: ProblemsListState, action) => {
        state.loading = false
        state.list = action.payload.map((problem) => ({
          problem,
          selected: false,
        }))
        state.success = true
      },
    )

    builder.addCase(
      problemsList.rejected,
      (state: ProblemsListState, action) => {
        state.loading = false
        state.success = false
        state.error = action.error
      },
    )

    // add

    builder.addCase(
      createProblem.fulfilled,
      (state: ProblemsListState, action) => {
        state.list.unshift({ problem: action.payload, selected: false })
      },
    )

    builder.addCase(
      deleteProblem.fulfilled,
      (
        state: ProblemsListState,
        { payload }: { payload: DeleteProblemResponse },
      ) => {
        const foundIndex = state.list.findIndex(
          (item) => item.problem.id === payload?.id,
        )
        state.list.splice(foundIndex, 1)
      },
    )

    // deleteMany
    builder.addCase(deleteMany.pending, (state: ProblemsListState) => {})

    builder.addCase(deleteMany.fulfilled, (state: ProblemsListState) => {
      state.list = state.list.filter((item) => !item.selected)
    })

    builder.addCase(deleteMany.rejected, (state: ProblemsListState, action) => {
      state.error = action.error
    })
  },
})

export const { enterProblemSelectionMode, leaveProblemSelectionMode } =
  problemsSlice.actions
export default problemsSlice.reducer
