import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomerDetailPage from "@/components/CustomerDetailPage"
import { UserRoles } from "@/types/common"

const CustomerDetail = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Customer Detail | Arrium" />
    <CustomerDetailPage />
  </AdminLayout>
)

export default CustomerDetail
