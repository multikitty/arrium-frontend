import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import ReferralsPage from "@/components/ReferralsPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IReferralsProps {
  params: IPageProps
}

const Referrals: React.FC<IReferralsProps> = ({ params }) => (
  <AdminLayout
    roles={[UserRoles.admin, UserRoles.salesAgent]}
    country_code={params.country_code}
  >
    <Seo title="Referrals | Arrium" />
    <ReferralsPage />
  </AdminLayout>
)

export default Referrals
