import React from "react"
import { navigate } from "gatsby"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { UserRoles } from "@/types/common"
import { useStore } from "@/store"

interface IProps {
  children: React.ReactNode
  role: UserRoles
}

const AuthGuard = (props: IProps) => {
  const { userStore } = useStore()

  if (!userStore.isAuthenticated) isBrowser() && navigate("/signin")
  if (
    props.role === UserRoles.admin &&
    userStore.currentUser?.role !== UserRoles.admin
  )
    isBrowser() && navigate("/403")

  return <>{props.children}</>
}

export default observer(AuthGuard)
