import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import BlockAvailabilityPage from "@/components/BlockAvailabilityPage"
import { UserRoles } from "@/constants/common"

const BlockAvailability = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Block Availability | Arrium" />
    <BlockAvailabilityPage />
  </DriverLayout>
)

export default BlockAvailability
