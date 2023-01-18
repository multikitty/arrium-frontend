import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import PlansPage from "@/components/PlansPage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface PlansProps {
  params: PageProps
}

const Plans: React.FC<PlansProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Plans | Arrium" />
    <PlansPage />
  </AdminLayout>
)

export default Plans
