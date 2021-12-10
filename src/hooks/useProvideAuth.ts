import { useState } from "react"
import { UserType } from "../types/auth"

export interface AuthContextType {
  user: UserType
  verifyPhone: () => void
  verifyEmail: () => void
  isAuthenticated: boolean
  authenticateUser: (user: UserType) => void
}

const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<UserType>(null)

  const verifyPhone = () =>
    setUser(prev => ({ ...prev, isPhoneVerified: true }))
  const verifyEmail = () =>
    setUser(prev => ({ ...prev, isEmailVerified: true }))
  const authenticateUser = (user: UserType) => {
    console.log("user", user)
    setUser(user)
  }

  return {
    user,
    verifyPhone,
    verifyEmail,
    isAuthenticated: !!user,
    authenticateUser,
  }
}

export default useProvideAuth
