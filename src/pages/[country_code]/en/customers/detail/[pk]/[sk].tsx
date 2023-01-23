import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomerDetailPage from "@/components/CustomerDetailPage"
import { UserRoles } from "@/constants/common"

interface CustomerDetail {
  params: {
    country_code: string
    pk: string
    sk: string
  }
}

const CustomerDetail: React.FC<CustomerDetail> = ({ params }) => {
  return (
    <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
      <Seo title="Customer Detail | Arrium" />
      <CustomerDetailPage
        country_code={params.country_code}
        pk={params.pk}
        sk={params.sk}
      />
    </AdminLayout>
  )
}

export default CustomerDetail
