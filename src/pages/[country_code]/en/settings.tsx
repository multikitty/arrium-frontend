import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import SettingsPage from "@/components/SettingsPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface ISettingsProps {
  params: IPageProps
}

const Settings: React.FC<ISettingsProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Settings | Arrium" />
    <SettingsPage />
  </AdminLayout>
)

export default Settings
