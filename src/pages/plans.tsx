import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import PlansPage from "@/components/PlansPage"

const Plans = () => (
  <AdminLayout>
    <Seo title="Plans | Arrium" />
    <PlansPage />
  </AdminLayout>
)

export default Plans
