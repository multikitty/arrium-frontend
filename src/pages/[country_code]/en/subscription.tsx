import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import { UserRoles } from "@/constants/common"
import { PageProps } from "@/lib/interfaces/common"
import SubscriptionPage from "@/components/SubscriptionPage"

interface SubscriptionProps {
  params: PageProps
}

const Subscription: React.FC<SubscriptionProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Subscription | Arrium" />
    <SubscriptionPage country_code={params.country_code} />
  </DriverLayout>
)

export default Subscription
