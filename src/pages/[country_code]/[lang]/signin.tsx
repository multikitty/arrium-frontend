import React from "react"

import Seo from "@/components/Seo"
import SignInPage from "@/components/SignInPage"

const signin = () => {
  return (
    <React.Fragment>
      <Seo title="Sign In | Arrium" />
      <SignInPage />
    </React.Fragment>
  )
}

export default signin
