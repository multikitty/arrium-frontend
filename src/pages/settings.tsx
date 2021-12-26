import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import AdminLayout from "../components/AdminLayout"
import SettingsPage from "../components/SettingsPage"

const Settings = () => (
  <TopLayout>
    <AdminLayout>
      <Seo title="Settings | Arrium" />
      <SettingsPage />
    </AdminLayout>
  </TopLayout>
)

export default Settings
