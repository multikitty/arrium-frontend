import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/constants/common"
// No such page right now, do not uncomment this
// import DashboardPage from "../components/DashboardPage"

const Dashboard = () => (
  <AdminLayout roles={[UserRoles.admin, UserRoles.salesAgent]}>
    <Seo title="Dashboard | Arrium" />
    {/* <DashboardPage /> */}
  </AdminLayout>
)

export default Dashboard
