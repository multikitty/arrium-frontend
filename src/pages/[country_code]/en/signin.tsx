import React from "react"

import Seo from "@/components/Seo"
import SignInPage from "@/components/SignInPage"
import { PageProps } from "@/lib/interfaces/common"

interface SigninProps {
  params: PageProps
}

const signin: React.FC<SigninProps> = ({ params }) => {
  return (
    <React.Fragment>
      <Seo title="Sign In | Arrium" />
      <SignInPage country_code={params.country_code} />
    </React.Fragment>
  )
}

export default signin
