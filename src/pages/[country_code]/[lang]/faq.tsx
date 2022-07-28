import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import FAQPage from "@/components/FAQPage"
import { UserRoles } from "@/constants/common"

const FAQ = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="FAQ | Arrium" />
    <FAQPage />
  </DriverLayout>
)

export default FAQ
