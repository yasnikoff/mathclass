import { createSlice } from "@reduxjs/toolkit"
export type UsersState = {}

export const initialState = {}
const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default slice.reducer
