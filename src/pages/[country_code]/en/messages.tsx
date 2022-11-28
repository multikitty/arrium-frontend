import * as React from "react"

import Seo from "@/components/Seo"
import AdminLayout from "@/components/AdminLayout"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"
// import SettingsPage from "../components/SettingsPage"

interface IMessagesProps {
  params: IPageProps
}

const Messages: React.FC<IMessagesProps> = ({ params }) => (
  <AdminLayout roles={[UserRoles.admin]} country_code={params.country_code}>
    <Seo title="Messages | Arrium" />
    {/* <SettingsPage /> */}
  </AdminLayout>
)

export default Messages
