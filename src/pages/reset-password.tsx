import React from "react"
import { PageProps } from "gatsby"
import ForgotPasswordVerify from "@/containers/ForgotPasswordVerify/ForgotPasswordVerify"

const ForgotPasswordVerifyPage: React.FC<PageProps> = ({ params }) => {
  return <ForgotPasswordVerify country_code={params.country_code} />
}

export default ForgotPasswordVerifyPage
