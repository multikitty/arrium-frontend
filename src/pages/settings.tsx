import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import SettingsPage from "@/components/SettingsPage"

const Settings = () => (
  <AdminLayout>
    <Seo title="Settings | Arrium" />
    <SettingsPage />
  </AdminLayout>
)

export default Settings
