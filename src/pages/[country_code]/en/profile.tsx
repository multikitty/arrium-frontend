import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import ProfilePage from "@/components/ProfilePage"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"

interface ProfileProps {
  params: PageProps
}

const Profile: React.FC<ProfileProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Profile | Arrium" />
    <ProfilePage country_code={params.country_code} />
  </DriverLayout>
)

export default Profile
