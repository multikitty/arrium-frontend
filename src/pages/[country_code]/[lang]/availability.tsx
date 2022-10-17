import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AvailabilityPage from "@/components/AvailabilityPage"
import { UserRoles } from "@/constants/common"

const Availability = ({ params }: any) => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Availability | Arrium" />
    <AvailabilityPage country_code={params.country_code} lang={params.lang} />
  </DriverLayout>
)

export default Availability
