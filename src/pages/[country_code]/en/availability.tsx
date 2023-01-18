import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AvailabilityPage from "@/components/AvailabilityPage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface AvailabilityProps {
  params: PageProps
}

const Availability: React.FC<AvailabilityProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Availability | Arrium" />
    <AvailabilityPage country_code={params.country_code} />
  </DriverLayout>
)

export default Availability
