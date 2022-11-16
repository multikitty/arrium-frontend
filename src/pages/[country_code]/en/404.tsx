import * as React from "react"

import Seo from "@/components/Seo"
import _404Page from "@/components/404Page"
import { IPageProps } from "@/lib/interfaces/common"

interface I404Props {
  params: IPageProps
}

const Error: React.FC<I404Props> = ({ params }) => (
  <React.Fragment>
    <Seo title="404: Not found" />
    <_404Page country_code={params.country_code} />
  </React.Fragment>
)

export default Error
