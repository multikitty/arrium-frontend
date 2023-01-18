import * as React from "react"

import Seo from "@/components/Seo"
import ForgotPasswordPage from "@/components/ForgotPasswordPage"
import { PageProps } from "@/lib/interfaces/common"

interface ForgotPasswordProps {
  params: PageProps
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ params }) => (
  <React.Fragment>
    <Seo title="Forgot Password | Arrium" />
    <ForgotPasswordPage country_code={params.country_code} />
  </React.Fragment>
)

export default ForgotPassword
