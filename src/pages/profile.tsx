import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"
import ProfilePage from "../components/ProfilePage"

const Profile = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Profile | Arrium" />
      <ProfilePage />
    </DriverLayout>
  </TopLayout>
)

export default Profile
