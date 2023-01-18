import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AutomationSchedulePage from "@/components/AutomationSchedulePage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface AutomationScheduleProps {
  params: PageProps
}

const AutomationSchedule: React.FC<AutomationScheduleProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Automation Schedule | Arrium" />
    <AutomationSchedulePage country_code={params.country_code} />
  </DriverLayout>
)

export default AutomationSchedule
