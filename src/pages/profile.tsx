import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import ProfilePage from "@/components/ProfilePage"

const Profile = () => (
  <DriverLayout>
    <Seo title="Profile | Arrium" />
    <ProfilePage />
  </DriverLayout>
)

export default Profile
