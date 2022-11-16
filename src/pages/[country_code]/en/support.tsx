import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import SupportPage from "@/components/SupportPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface ISupportProps {
  params: IPageProps
}

const Support: React.FC<ISupportProps> = ({ params }) => {
  console.log("support props", params)

  return (
    <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
      <Seo title="Support | Arrium" />
      <SupportPage />
    </DriverLayout>
  )
}

export default Support
