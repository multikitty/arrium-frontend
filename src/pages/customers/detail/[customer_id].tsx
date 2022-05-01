import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomerDetailPage from "@/components/CustomerDetailPage"

const CustomerDetail = () => (
  <AdminLayout>
    <Seo title="Customer Detail | Arrium" />
    <CustomerDetailPage />
  </AdminLayout>
)

export default CustomerDetail
