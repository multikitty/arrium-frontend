import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import AdminLayout from "../components/AdminLayout"
import ReferralsPage from "../components/ReferralsPage"

const Referrals = () => (
  <TopLayout>
    <AdminLayout>
      <Seo title="Referrals | Arrium" />
      <ReferralsPage />
    </AdminLayout>
  </TopLayout>
)

export default Referrals
