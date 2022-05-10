import * as React from "react"
import { navigate } from "gatsby"

import LandingPage from "@/components/LandingPage"
import { UserRoles } from "@/constants/common"
import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import { defaultRoutes } from "@/constants/common"
import { UserRolesType } from "@/types/common"

const IndexPage = () => {
  const { userStore } = useStore()

  if (userStore.isAuthenticated)
    isBrowser() &&
      navigate(
        `/${
          defaultRoutes[
            (userStore.currentUser?.role || UserRoles.driver) as UserRolesType
          ]
        }`
      )

  return (
    <React.Fragment>
      <LandingPage />
    </React.Fragment>
  )
}

export default IndexPage
