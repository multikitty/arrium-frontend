import React from "react"

import Seo from "@/components/Seo"
import SignUpPage from "@/components/SignUpPage"
import { IPageProps } from "@/lib/interfaces/common"

interface ISignupProps {
  params: IPageProps
}

const Signup: React.FC<ISignupProps> = ({ params }) => {
  return (
    <React.Fragment>
      <Seo title="Sign Up | Arrium" />
      <SignUpPage country_code={params.country_code} />
    </React.Fragment>
  )
}

export default Signup
