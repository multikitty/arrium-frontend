import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomersPage from "@/components/CustomersPage"

const Customers = () => (
  <AdminLayout>
    <Seo title="Customers | Arrium" />
    <CustomersPage />
  </AdminLayout>
)

export default Customers
