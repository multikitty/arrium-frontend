import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import AutomationSchedulePage from "@/components/AutomationSchedulePage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IAutomationScheduleProps {
  params: IPageProps
}

const AutomationSchedule: React.FC<IAutomationScheduleProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Automation Schedule | Arrium" />
    <AutomationSchedulePage country_code={params.country_code} />
  </DriverLayout>
)

export default AutomationSchedule
