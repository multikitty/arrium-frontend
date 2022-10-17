import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomersPage from "@/components/CustomersPage"
import { UserRoles } from "@/constants/common"

const Customers = ({ params }: any) => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Customers | Arrium" />
    <CustomersPage country_code={params.country_code} lang={params.lang} />
  </AdminLayout>
)

export default Customers
