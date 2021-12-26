import * as React from "react"

import TopLayout from "../../../components/TopLayout"
import Seo from "../../../components/Seo"
import AdminLayout from "../../../components/AdminLayout"
import CustomerDetailPage from "../../../components/CustomerDetailPage"

const CustomerDetail = () => (
  <TopLayout>
    <AdminLayout>
      <Seo title="Customer Detail | Arrium" />
      <CustomerDetailPage />
    </AdminLayout>
  </TopLayout>
)

export default CustomerDetail
