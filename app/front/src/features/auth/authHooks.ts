import { useAppSelector } from "../../app/hooks"

import { UserShort } from "../users"
import { AppState } from "../../app/store"

export const useAuth = (
  useAuthValue = true,
): { user: UserShort | undefined } => {
  const { user } = useAppSelector((state: AppState) => state.auth)

  return { user: useAuthValue ? user : undefined }
}
