import * as React from "react"

import TopLayout from "../components/topLayout"
import Seo from "../components/seo"
import DriverLayout from "../components/DriverLayout"

const Subscription = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Subscription | Arrium" />
    </DriverLayout>
  </TopLayout>
)

export default Subscription
