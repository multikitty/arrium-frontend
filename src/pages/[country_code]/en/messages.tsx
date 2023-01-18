import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"
// import SettingsPage from "../components/SettingsPage"

interface MessagesProps {
  params: PageProps
}

const Messages: React.FC<MessagesProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Messages | Arrium" />
    {/* <SettingsPage /> */}
  </AdminLayout>
)

export default Messages
