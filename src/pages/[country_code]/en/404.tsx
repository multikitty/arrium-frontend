import * as React from "react"

import Seo from "@/components/Seo"
import _404Page from "@/components/404Page"
import { PageProps } from "@/lib/interfaces/common"

interface _404Props {
  params: PageProps
}

const Error: React.FC<_404Props> = ({ params }) => (
  <React.Fragment>
    <Seo title="404: Not found" />
    <_404Page country_code={params.country_code} />
  </React.Fragment>
)

export default Error
