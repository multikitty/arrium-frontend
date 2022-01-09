import * as React from "react"

import TopLayout from "../components/TopLayout"
import Seo from "../components/Seo"
import _404Page from "../components/404Page"

const Error = () => (
  <TopLayout>
    <Seo title="404: Not found" />
    <_404Page />
  </TopLayout>
)

export default Error
