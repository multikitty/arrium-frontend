import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"
import { UserRoles } from "@/types/common"

const AddCustomer = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="AddCustomer | Arrium" />
    <AddCustomerPage />
  </AdminLayout>
)

export default AddCustomer
