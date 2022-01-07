import React, { createContext, useContext } from "react"
import { ChildrenProps } from "../components/AdminLayout/AdminLayout.types"
import useProvideAuth, { AuthContextType } from "./useProvideAuth"

const authContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  verifyPhone: () => {},
  verifyEmail: () => {},
  authenticateUser: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(authContext)

export function ProvideAuth({ children }: ChildrenProps) {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
