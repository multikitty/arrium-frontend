import * as React from "react"

import TopLayout from "../components/topLayout"
import Seo from "../components/seo"

const Error = () => (
  <TopLayout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </TopLayout>
)

export default Error
