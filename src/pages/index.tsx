import * as React from "react"
import { navigate } from "gatsby"

import LandingPage from "@/components/LandingPage"
import { DriverPages } from "@/types/common"
import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"

const IndexPage = () => {
  const { userStore } = useStore()

  if (userStore.isAuthenticated)
    isBrowser() && navigate(`/${DriverPages.blockAvailability}`)

  return (
    <React.Fragment>
      <LandingPage />
    </React.Fragment>
  )
}

export default IndexPage
