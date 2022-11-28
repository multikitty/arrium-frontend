import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"
// No such page right now, do not uncomment this
// import DashboardPage from "../components/DashboardPage"

interface IDashboardProps {
  params: IPageProps
}

const Dashboard: React.FC<IDashboardProps> = ({ params }) => (
  <AdminLayout
    roles={[UserRoles.admin, UserRoles.salesAgent]}
    country_code={params.country_code}
  >
    <Seo title="Dashboard | Arrium" />
    {/* <DashboardPage /> */}
  </AdminLayout>
)

export default Dashboard
