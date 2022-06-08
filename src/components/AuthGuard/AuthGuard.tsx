import React from "react"
import { navigate } from "gatsby"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import routes from "@/constants/routes"

interface IProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const AuthGuard = (props: IProps) => {
  const { userStore } = useStore()

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
