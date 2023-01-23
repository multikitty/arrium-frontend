import React from "react"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"

interface AuthGuardProps extends PageProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const AuthGuard = (props: AuthGuardProps) => {
  const { navigate } = useNavigate({
    country_code: props.country_code,
  })
  const { userStore } = useStore()

  // if (props?.country_code === DEFAULT_COUNTRY) {
  //   isBrowser() && navigate(routes[404])
  //   return null
  // }

  if (!userStore.isAuthenticated) {
    isBrowser() && navigate(routes.signin)
    return null
  }
  if (!props.roles.includes(userStore.currentUser?.role as UserRolesType)) {
    isBrowser() && navigate(routes[403])
    return null
  }

  return <>{props.children}</>
}

export default observer(AuthGuard)
