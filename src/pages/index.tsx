import * as React from "react"

import TopLayout from "../components/TopLayout"
import { useAuth } from "../hooks/useAuth"
import LandingPage from "../components/LandingPage"
import { navigate } from "gatsby"
import { DriverPages } from "../types/common"
import { isBrowser } from "../utils/common"

const IndexPage = () => {
  const auth = useAuth()
  console.log("auth", auth)

  if (auth.isAuthenticated)
    isBrowser() && navigate(`/${DriverPages.blockAvailability}`)

  return (
    <TopLayout>
      <LandingPage />
    </TopLayout>
  )
}

export default IndexPage
