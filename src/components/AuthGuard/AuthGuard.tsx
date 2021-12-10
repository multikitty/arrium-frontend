import React from "react"
import { useAuth } from "../../hooks/useAuth"
import { navigate } from "gatsby"
import { isBrowser } from "../../utils/common"

interface IProps {
  children: React.ReactNode
}

const AuthGuard = (props: IProps) => {
  const auth = useAuth()
  if (!auth.isAuthenticated) isBrowser() && navigate("/signin")

  return <>{props.children}</>
}

export default AuthGuard
