import React from "react"
import "./TopLayout.css"

interface IProps {
  children: React.ReactNode
}

const TopLayout: React.FC<IProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default TopLayout
