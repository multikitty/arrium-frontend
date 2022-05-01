import React from "react"
import "./TopLayout.css"
import { ChildrenProps } from "../AdminLayout/AdminLayout.types"

const TopLayout = ({ children }: ChildrenProps) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default TopLayout
