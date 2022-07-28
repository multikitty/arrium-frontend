import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AutomationSchedulePage from "@/components/AutomationSchedulePage"
import { UserRoles } from "@/constants/common"

const AutomationSchedule = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Automation Schedule | Arrium" />
    <AutomationSchedulePage />
  </DriverLayout>
)

export default AutomationSchedule
