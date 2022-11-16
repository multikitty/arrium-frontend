import * as React from "react"

import Seo from "@/components/Seo"
import ResetPasswordPage from "@/components/ResetPasswordPage"
import { IPageProps } from "@/lib/interfaces/common"

interface IResetPasswordProps {
  params: IPageProps
}

const ResetPassword: React.FC<IResetPasswordProps> = ({ params }) => (
  <React.Fragment>
    <Seo title="Reset Password | Arrium" />
    <ResetPasswordPage country_code={params.country_code} />
  </React.Fragment>
)

export default ResetPassword
