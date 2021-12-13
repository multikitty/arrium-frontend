import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"
import SubscriptionPage from "../components/SubscriptionPage"

const Subscription = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Subscription | Arrium" />
      <SubscriptionPage />
    </DriverLayout>
  </TopLayout>
)

export default Subscription
