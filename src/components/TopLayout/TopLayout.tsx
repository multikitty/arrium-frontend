import React from "react"
import "./TopLayout.css"
import { AdminLayoutProps } from "../AdminLayout/AdminLayout.types"

const TopLayout = ({ children }: AdminLayoutProps) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default TopLayout
