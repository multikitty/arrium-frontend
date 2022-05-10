import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import ProfilePage from "@/components/ProfilePage"
import { UserRoles } from "@/types/common"

const Profile = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Profile | Arrium" />
    <ProfilePage />
  </DriverLayout>
)

export default Profile
