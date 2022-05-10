import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/types/common"
// import SettingsPage from "../components/SettingsPage"

const Messages = () => (
  <AdminLayout roles={[UserRoles.admin]}>
    <Seo title="Messages | Arrium" />
    {/* <SettingsPage /> */}
  </AdminLayout>
)

export default Messages
