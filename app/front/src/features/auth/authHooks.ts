import { useAppSelector } from "../../app/hooks"

import { User } from "../users"
import { AppState } from "../../app/store"

export const useAuth = (useAuthValue = true): { user: User | undefined } => {
  const { user } = useAppSelector((state: AppState) => state.auth)
 
  return { user: useAuthValue ? user : undefined }
}
