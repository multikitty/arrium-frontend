import React from "react"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IAuthGuardProps extends IPageProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const AuthGuard = (props: IAuthGuardProps) => {
  const { navigate } = useNavigate({
    country_code: props.country_code,
    lang: props.lang,
  })
  const { userStore } = useStore()

  if (props?.country_code === "uk" || props?.lang === "en") {
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
