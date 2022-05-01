import * as React from "react"

import Seo from "@/components/Seo"
import _404Page from "@/components/404Page"

const Error = () => (
  <React.Fragment>
    <Seo title="404: Not found" />
    <_404Page />
  </React.Fragment>
)

export default Error
