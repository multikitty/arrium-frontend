import React from "react"
import "./TopLayout.css"

interface TopLayoutProps {
  children: React.ReactNode
}

const TopLayout: React.FC<TopLayoutProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default TopLayout
