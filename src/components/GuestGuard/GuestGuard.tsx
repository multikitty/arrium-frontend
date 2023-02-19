import React from "react"
import { observer } from "mobx-react-lite"

import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"

interface GuestGuardProps extends PageProps {
  children: React.ReactNode
}

const GuestGuard = (props: GuestGuardProps) => {
  const { navigateToDefault } = useNavigate({
    country_code: props.country_code,
  })
  const { userStore } = useStore()

  if (userStore.isAuthenticated) {
    isBrowser() && navigateToDefault(userStore.currentUser?.role)
    return null
  }

  return <>{props.children}</>
}

export default observer(GuestGuard)
