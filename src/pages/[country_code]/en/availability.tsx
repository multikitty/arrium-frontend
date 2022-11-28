import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AvailabilityPage from "@/components/AvailabilityPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IAvailabilityProps {
  params: IPageProps
}

const Availability: React.FC<IAvailabilityProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Availability | Arrium" />
    <AvailabilityPage country_code={params.country_code} />
  </DriverLayout>
)

export default Availability
