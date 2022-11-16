import * as React from "react"

import Seo from "@/components/Seo"
import ForgotPasswordPage from "@/components/ForgotPasswordPage"
import { IPageProps } from "@/lib/interfaces/common"

interface IForgotPasswordProps {
  params: IPageProps
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ params }) => (
  <React.Fragment>
    <Seo title="Forgot Password | Arrium" />
    <ForgotPasswordPage country_code={params.country_code} />
  </React.Fragment>
)

export default ForgotPassword
