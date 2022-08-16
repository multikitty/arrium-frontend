import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomerDetailPage from "@/components/CustomerDetailPage"
import { UserRoles } from "@/constants/common"

const CustomerDetail = ({ params }: any) => {
  return (
    <AdminLayout roles={[UserRoles.admin]}>
      <Seo title="Customer Detail | Arrium" />
      <CustomerDetailPage
        country_code={params.country_code}
        lang={params.lang}
        pk={params.pk}
        sk={params.sk}
      />
    </AdminLayout>
  )
}

export default CustomerDetail
