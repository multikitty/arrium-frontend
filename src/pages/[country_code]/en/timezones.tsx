import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import TimezonesPage from "@/components/TimezonesPage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface TimezonesProps {
  params: PageProps
}

const Timezones: React.FC<TimezonesProps> = ({ params }) => {
  console.log("timezones props", params)

  return (
    <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
      <Seo title="Timezones | Arrium" />
      <TimezonesPage />
    </AdminLayout>
  )
}

export default Timezones
