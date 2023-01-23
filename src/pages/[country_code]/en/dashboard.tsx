import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"
// No such page right now, do not uncomment this
// import DashboardPage from "../components/DashboardPage"

interface DashboardProps {
  params: PageProps
}

const Dashboard: React.FC<DashboardProps> = ({ params }) => (
  <AdminLayout
    roles={[UserRoles.admin, UserRoles.salesAgent]}
    country_code={params.country_code}
  >
    <Seo title="Dashboard | Arrium" />
    {/* <DashboardPage /> */}
  </AdminLayout>
)

export default Dashboard
