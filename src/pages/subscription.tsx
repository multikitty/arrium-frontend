import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import SubscriptionPage from "@/components/SubscriptionPage"

const Subscription = () => (
  <DriverLayout>
    <Seo title="Subscription | Arrium" />
    <SubscriptionPage />
  </DriverLayout>
)

export default Subscription
