import React from "react"

import Seo from "@/components/Seo"
import SignUpPage from "@/components/SignUpPage"
import { PageProps } from "@/lib/interfaces/common"

interface SignupProps {
  params: PageProps
}

const Signup: React.FC<SignupProps> = ({ params }) => {
  return (
    <React.Fragment>
      <Seo title="Sign Up | Arrium" />
      <SignUpPage country_code={params.country_code} />
    </React.Fragment>
  )
}

export default Signup
