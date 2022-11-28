import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomersPage from "@/components/CustomersPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface ICustomersProps {
  params: IPageProps
}

const Customers: React.FC<ICustomersProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Customers | Arrium" />
    <CustomersPage country_code={params.country_code} />
  </AdminLayout>
)

export default Customers
