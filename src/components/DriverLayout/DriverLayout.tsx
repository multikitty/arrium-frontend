import React from "react"
import SidePanel from "../SidePanel"
import Topbar from "../Topbar"
import {
  StyledDriverLayout,
  StyledDriverLayoutContent,
} from "./DriverLayout.styled"

interface Props {
  children: React.ReactNode
}

const DriverLayout = (props: Props) => {
  return (
    <StyledDriverLayout>
      <SidePanel />
      <StyledDriverLayoutContent>
        <Topbar />
        {props.children}
      </StyledDriverLayoutContent>
    </StyledDriverLayout>
  )
}

export default DriverLayout
