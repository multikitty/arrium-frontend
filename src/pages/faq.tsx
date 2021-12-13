import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import DriverLayout from "../components/DriverLayout"
import FAQPage from "../components/FAQPage"

const FAQ = () => (
  <TopLayout>
    <DriverLayout>
      <Seo title="FAQ | Arrium" />
      <FAQPage />
    </DriverLayout>
  </TopLayout>
)

export default FAQ
