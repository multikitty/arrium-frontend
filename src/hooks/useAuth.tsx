import React, { createContext, useContext } from "react"
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

interface IProps {
  children: React.ReactNode
}

export function ProvideAuth({ children }: IProps) {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
