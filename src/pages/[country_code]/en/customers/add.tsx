import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import AddCustomerPage from "@/components/AddCustomerPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IAddCustomerProps {
  params: IPageProps
}

const AddCustomer: React.FC<IAddCustomerProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Add Customer | Arrium" />
    <AddCustomerPage country_code={params.country_code} />
  </AdminLayout>
)

export default AddCustomer
