import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import BlockAvailabilityPage from "@/components/BlockAvailabilityPage"

const BlockAvailability = () => (
  <DriverLayout>
    <Seo title="Block Availability | Arrium" />
    <BlockAvailabilityPage />
  </DriverLayout>
)

export default BlockAvailability
