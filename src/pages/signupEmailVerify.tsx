import React from "react"
import { PageProps } from "gatsby"
import SignUpEmailVerify from "@/containers/SignUpEmailVerify/SignUpEmailVerify"

const SignUpEmailVerifyPage: React.FC<PageProps> = ({ params }) => {
  return <SignUpEmailVerify country_code={params.country_code} />
}

export default SignUpEmailVerifyPage
