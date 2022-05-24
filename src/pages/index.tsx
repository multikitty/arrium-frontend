import * as React from "react"

import LandingPage from "@/components/LandingPage"
import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import navigateToDefault from "@/utils/navigateToDefault"

const IndexPage = () => {
  const { userStore } = useStore()

  if (userStore.isAuthenticated) {
    if (!isBrowser()) return null
    navigateToDefault(userStore.currentUser?.role)
    return null
  }

  return (
    <React.Fragment>
      <LandingPage />
    </React.Fragment>
  )
}

export default IndexPage
