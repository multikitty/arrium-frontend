import * as React from "react"

import LandingPage from "@/components/LandingPage"
import isBrowser from "@/utils/isBrowser"
import { useStore } from "@/store"
import useNavigate from "@/hooks/useNavigate"

const IndexPage = ({ params }: any) => {
  const { navigateToDefault } = useNavigate({
    country_code: params.country_code || "uk",
    lang: params.lang || "en",
  })
  const { userStore } = useStore()

  if (userStore.isAuthenticated) {
    if (!isBrowser()) return null
    navigateToDefault(userStore.currentUser?.role)
    return null
  }

  return (
    <React.Fragment>
      <LandingPage
        country_code={params.country_code || "uk"}
        lang={params.lang || "en"}
      />
    </React.Fragment>
  )
}

export default IndexPage
