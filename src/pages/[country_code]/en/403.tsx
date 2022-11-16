import * as React from "react"

import Seo from "@/components/Seo"
import _403Page from "@/components/403Page"
import { IPageProps } from "@/lib/interfaces/common"

interface I403Props {
  params: IPageProps
}

const UnAuthorized: React.FC<I403Props> = ({ params }) => (
  <React.Fragment>
    <Seo title="403: Unauthorized" />
    <_403Page country_code={params.country_code} />
  </React.Fragment>
)

export default UnAuthorized
