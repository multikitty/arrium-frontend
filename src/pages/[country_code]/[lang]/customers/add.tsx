import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"
import { UserRoles } from "@/constants/common"

const AddCustomer = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Add Customer | Arrium" />
    <AddCustomerPage />
  </AdminLayout>
)

export default AddCustomer
