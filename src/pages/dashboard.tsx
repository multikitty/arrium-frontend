import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/types/common"
// import SettingsPage from "../components/SettingsPage"

const Dashboard = () => (
  <AdminLayout roles={[UserRoles.admin, UserRoles.salesAgent]}>
    <Seo title="Dashboard | Arrium" />
    {/* <SettingsPage /> */}
  </AdminLayout>
)

export default Dashboard
