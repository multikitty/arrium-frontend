import * as React from "react"

import TopLayout from "../components/topLayout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <TopLayout>
    <Seo title="Home | Arrium" />
    <h1>Hi Mohsin Hussain</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/signin">SignIn</Link>
  </TopLayout>
)

export default IndexPage
