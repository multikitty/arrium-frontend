import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import TimezonesPage from "@/components/TimezonesPage"
import { UserRoles } from "@/constants/common"

const Timezones = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Timezones | Arrium" />
    <TimezonesPage />
  </AdminLayout>
)

export default Timezones
