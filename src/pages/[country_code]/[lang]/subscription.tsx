import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import SubscriptionPage from "@/components/SubscriptionPage"
import { UserRoles } from "@/constants/common"

const Subscription = () => (
  <DriverLayout roles={[UserRoles.driver]}>
    <Seo title="Subscription | Arrium" />
    <SubscriptionPage />
  </DriverLayout>
)

export default Subscription
