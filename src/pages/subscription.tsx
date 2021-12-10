import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"

const Subscription = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Subscription | Arrium" />
    </DriverLayout>
  </TopLayout>
)

export default Subscription
