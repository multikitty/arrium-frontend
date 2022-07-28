import * as React from "react"
import { useParams } from "@reach/router"

import LandingPage from "@/components/LandingPage"
import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import useNavigate, { ParamType } from "@/hooks/useNavigate"

const IndexPage = () => {
  const params = useParams()
  const { navigateToDefault } = useNavigate(params as ParamType)
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
