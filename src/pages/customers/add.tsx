import * as React from "react"

import TopLayout from "../../components/TopLayout"
import Seo from "../../components/Seo"
import AdminLayout from "../../components/AdminLayout"
import AddCustomerPage from "../../components/AddCustomerPage"

const AddCustomer = () => (
  <TopLayout>
    <AdminLayout>
      <Seo title="AddCustomer | Arrium" />
      <AddCustomerPage />
    </AdminLayout>
  </TopLayout>
)

export default AddCustomer
