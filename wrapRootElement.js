import React from "react"
import { ProvideAuth } from "./src/hooks/useAuth"

const wrapRootElement = ({ element }) => {
  return <ProvideAuth>{element}</ProvideAuth>
}

export default wrapRootElement
