import { createSlice } from "@reduxjs/toolkit"

export type ErrorsState = {
  message: string
}

export const initialState = {
  message: "",
}
export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export default errorsSlice.reducer
