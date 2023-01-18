import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import CustomersPage from "@/components/CustomersPage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface CustomersProps {
  params: PageProps
}

const Customers: React.FC<CustomersProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Customers | Arrium" />
    <CustomersPage country_code={params.country_code} />
  </AdminLayout>
)

export default Customers
