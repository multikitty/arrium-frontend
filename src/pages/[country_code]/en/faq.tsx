import * as React from "react"

import Seo from "@/components/Seo"
import DriverLayout from "@/components/DriverLayout"
import FAQPage from "@/components/FAQPage"
import { UserRoles } from "@/constants/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IFAQProps {
  params: IPageProps
}

const FAQ: React.FC<IFAQProps> = ({ params }) => (
  <DriverLayout roles={[UserRoles.driver]} country_code={params.country_code}>
    <Seo title="FAQ | Arrium" />
    <FAQPage />
  </DriverLayout>
)

export default FAQ
