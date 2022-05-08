import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import TimezonesPage from "@/components/TimezonesPage"

const Timezones = () => (
  <AdminLayout>
    <Seo title="Timezones | Arrium" />
    <TimezonesPage />
  </AdminLayout>
)

export default Timezones
