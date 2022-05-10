import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import ReferralsPage from "@/components/ReferralsPage"
import { UserRoles } from "@/constants/common"

const Referrals = () => (
  <AdminLayout roles={[UserRoles.admin, UserRoles.salesAgent]}>
    <Seo title="Referrals | Arrium" />
    <ReferralsPage />
  </AdminLayout>
)

export default Referrals
