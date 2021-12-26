import * as React from "react"

import TopLayout from "../../components/TopLayout"
import Seo from "../../components/Seo"
import AdminLayout from "../../components/AdminLayout"
import CustomersPage from "../../components/CustomersPage"

const Customers = () => (
  <TopLayout>
    <AdminLayout>
      <Seo title="Customers | Arrium" />
      <CustomersPage />
    </AdminLayout>
  </TopLayout>
)

export default Customers
