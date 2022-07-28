import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomersPage from "@/components/CustomersPage"
import { UserRoles } from "@/constants/common"

const Customers = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Customers | Arrium" />
    <CustomersPage />
  </AdminLayout>
)

export default Customers
