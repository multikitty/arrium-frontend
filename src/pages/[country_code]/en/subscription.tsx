import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import SubscriptionPage from "@/components/SubscriptionPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"
import PricingPlansPage from "@/components/PricingPlansPage"

interface ISubscriptionProps {
  params: IPageProps
}

const Subscription: React.FC<ISubscriptionProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="Subscription | Arrium" />
    {/* <SubscriptionPage /> */}
    <PricingPlansPage />
  </DriverLayout>
)

export default Subscription
