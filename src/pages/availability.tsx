import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AvailabilityPage from "@/components/AvailabilityPage"
import { UserRoles } from "@/constants/common"

const Availability = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Availability | Arrium" />
    <AvailabilityPage />
  </DriverLayout>
)

export default Availability
