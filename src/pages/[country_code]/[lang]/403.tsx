import * as React from "react"

import Seo from "@/components/Seo"
import _403Page from "@/components/403Page"

const UnAuthorized = () => (
  <React.Fragment>
    <Seo title="403: Unauthorized" />
    <_403Page />
  </React.Fragment>
)

export default UnAuthorized
