import * as React from "react"

import Seo from "@/components/Seo"
import ResetPasswordPage from "@/components/ResetPasswordPage"
import { PageProps } from "@/lib/interfaces/common"

interface ResetPasswordProps {
  params: PageProps
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ params }) => (
  <React.Fragment>
    <Seo title="Reset Password | Arrium" />
    <ResetPasswordPage country_code={params.country_code} />
  </React.Fragment>
)

export default ResetPassword
