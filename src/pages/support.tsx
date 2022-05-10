import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import SupportPage from "@/components/SupportPage"
import { UserRoles } from "@/types/common"

const Support = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Support | Arrium" />
    <SupportPage />
  </DriverLayout>
)

export default Support
