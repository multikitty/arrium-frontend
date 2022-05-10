import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import SettingsPage from "@/components/SettingsPage"
import { UserRoles } from "@/types/common"

const Settings = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Settings | Arrium" />
    <SettingsPage />
  </AdminLayout>
)

export default Settings
