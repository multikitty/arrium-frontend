import * as React from "react"

import Seo from "@/components/Seo"
import _403Page from "@/components/403Page"

const UnAuthorized = ({ params }: any) => (
  <React.Fragment>
    <Seo title="403: Unauthorized" />
    <_403Page country_code={params.country_code} lang={params.lang} />
  </React.Fragment>
)

export default UnAuthorized
