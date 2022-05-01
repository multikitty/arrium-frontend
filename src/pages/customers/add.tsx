import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"

const AddCustomer = () => (
  <AdminLayout>
    <Seo title="AddCustomer | Arrium" />
    <AddCustomerPage />
  </AdminLayout>
)

export default AddCustomer
