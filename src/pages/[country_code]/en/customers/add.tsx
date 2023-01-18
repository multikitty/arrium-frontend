import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface AddCustomerProps {
  params: PageProps
}

const AddCustomer: React.FC<AddCustomerProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Add Customer | Arrium" />
    <AddCustomerPage country_code={params.country_code} />
  </AdminLayout>
)

export default AddCustomer
