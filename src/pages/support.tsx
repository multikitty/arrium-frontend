import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"
import SupportPage from '../components/SupportPage'

const Support = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="Support | Arrium" />
      <SupportPage />
    </DriverLayout>
  </TopLayout>
)

export default Support
