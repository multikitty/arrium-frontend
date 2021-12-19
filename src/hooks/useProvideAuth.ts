import { navigate } from "gatsby-link"
import { useState } from "react"
import { UserType } from "../types/auth"
import { isBrowser } from "../utils/common"

export interface AuthContextType {
  user: UserType
  isAuthenticated: boolean
  verifyPhone: () => void
  verifyEmail: () => void
  authenticateUser: (user: UserType) => void
  logout: () => void
}

const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<UserType>(null)

  const verifyPhone = () => {
    setUser(prev => ({ ...prev, isPhoneVerified: true }))
    localStorage.setItem("isPhoneVerified", "true")
  }
  const verifyEmail = () => {
    setUser(prev => ({ ...prev, isEmailVerified: true }))
    localStorage.setItem("isEmailVerified", "true")
  }
  const authenticateUser = (user: UserType) => {
    setUser(user)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    if (!isBrowser()) return
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    setUser(null)
    navigate("/")
  }

  return {
    user:
      (isBrowser() &&
        localStorage.getItem("user") &&
        (JSON.parse(localStorage.getItem("user") || "") as UserType)) ||
      user,
    isAuthenticated: isBrowser()
      ? !!localStorage.getItem("isAuthenticated") || !!user
      : false,
    verifyPhone,
    verifyEmail,
    authenticateUser,
    logout,
  }
}

export default useProvideAuth
