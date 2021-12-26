import React from "react"
import { useAuth } from "../../hooks/useAuth"
import { navigate } from "gatsby"
import { isBrowser } from "../../utils/common"
import { UserRoles } from "../../types/common"

interface IProps {
  children: React.ReactNode
  role: UserRoles
}

const AuthGuard = (props: IProps) => {
  const auth = useAuth()
  if (!auth.isAuthenticated) isBrowser() && navigate("/signin")
  // if (props.role === UserRoles.admin && auth.user?.role !== UserRoles.admin)
  //   isBrowser() && navigate("/signin")

  return <>{props.children}</>
}

export default AuthGuard
