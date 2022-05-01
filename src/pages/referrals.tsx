import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import ReferralsPage from "@/components/ReferralsPage"

const Referrals = () => (
  <AdminLayout>
    <Seo title="Referrals | Arrium" />
    <ReferralsPage />
  </AdminLayout>
)

export default Referrals
