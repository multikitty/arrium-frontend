import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"
import BlockAvailabilityPage from "../components/BlockAvailabilityPage"

const BlockAvailability = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Block Availability | Arrium" />
      <BlockAvailabilityPage />
    </DriverLayout>
  </TopLayout>
)

export default BlockAvailability
