import * as React from "react"

import Seo from "@/components/Seo"
import _403Page from "@/components/403Page"
import { PageProps } from "@/lib/interfaces/common"

interface _403Props {
  params: PageProps
}

const UnAuthorized: React.FC<_403Props> = ({ params }) => (
  <React.Fragment>
    <Seo title="403: Unauthorized" />
    <_403Page country_code={params.country_code} />
  </React.Fragment>
)

export default UnAuthorized
