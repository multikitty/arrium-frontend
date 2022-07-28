import React from "react"
import { useParams } from "@reach/router"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import routes from "@/constants/routes"
import useNavigate, { ParamType } from "@/hooks/useNavigate"

interface IProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const AuthGuard = (props: IProps) => {
  const params = useParams()
  const { navigate } = useNavigate(params as ParamType)
  const { userStore } = useStore()

  if (params?.country_code === "uk" || params?.lang === "en") {
    isBrowser() && navigate(routes[404])
    return null
  }

  if (!userStore.isAuthenticated) {
    isBrowser() && navigate(routes.signin)
    return null
  }
  if (!props.roles.includes(userStore.currentUser?.role as never)) {
    isBrowser() && navigate(routes[403])
    return null
  }

  return <>{props.children}</>
}

export default observer(AuthGuard)
