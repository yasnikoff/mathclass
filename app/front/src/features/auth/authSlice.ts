import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { userLogin, LoginResponse } from "./authActions"
import { UserRole } from "../users"

const localStorageSection = "auth"
type SavedState = {
  access_token?: string
  user?: {
    username: string
    id: string
  }
}
function saveState(data: SavedState) {
  localStorage.setItem(localStorageSection, JSON.stringify(data))
}
function getSavedState() {
  return JSON.parse(localStorage.getItem(localStorageSection) || "null")
}
function cleaerSavedState() {
  localStorage.removeItem(localStorageSection)
}
const savedState = getSavedState()
export function logout() {
  cleaerSavedState()
}
export function isAuthSaved(): boolean {
  return !!getSavedState()
}

export type AuthState = {
  loading: boolean
  loggedIn: boolean
  access_token?: string
  user?: {
    username: string
    id: string
    role: UserRole
  }
  error?: SerializedError
  success: boolean
}

const initialState: AuthState = {
  loading: false,
  loggedIn: false,
  access_token: savedState?.access_token,
  user: savedState?.user,
  error: undefined,
  success: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      cleaerSavedState()
      state.loggedIn = false
      state.access_token = undefined
      state.user = undefined
      state.success = true
    },
    restore: (state: AuthState) => {
      const savedState = getSavedState()

      if (savedState?.access_token) {
        state.loggedIn = true
        state.access_token = savedState?.access_token
        state.user = savedState?.user
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: AuthState) => {
      state.loading = true
      state.error = undefined
    })

    builder.addCase(
      userLogin.fulfilled,
      (state: AuthState, { payload }: { payload: LoginResponse }) => {
        state.loading = false
        state.access_token = payload.access_token
        state.user = payload.user
        state.success = true
        state.loggedIn = true
        state.error = undefined
        saveState(payload)
      },
    )

    builder.addCase(userLogin.rejected, (state: AuthState, action) => {
      state.loading = false
      state.loggedIn = false
      state.access_token = undefined
      state.success = false
      cleaerSavedState()
      state.user = undefined
      state.error = action.payload as SerializedError
    })
  },
})
export default authSlice.reducer
