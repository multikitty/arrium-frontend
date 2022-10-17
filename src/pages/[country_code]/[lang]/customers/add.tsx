import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"
import { UserRoles } from "@/constants/common"

const AddCustomer = ({ params }: any) => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Add Customer | Arrium" />
    <AddCustomerPage country_code={params.country_code} lang={params.lang} />
  </AdminLayout>
)

export default AddCustomer
