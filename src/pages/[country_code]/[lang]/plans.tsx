import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import PlansPage from "@/components/PlansPage"
import { UserRoles } from "@/constants/common"

const Plans = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Plans | Arrium" />
    <PlansPage />
  </AdminLayout>
)

export default Plans
