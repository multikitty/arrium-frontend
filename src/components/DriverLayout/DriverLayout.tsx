import { useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import { devices } from "../../constants/device"
import MobileTopbar from "../MobileTopbar"
import AuthGuard from "../AuthGuard"
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
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState<boolean>(false)
  const isWebView = useMediaQuery(devices.web.up)

  const handleFullscreenMenuOpen = () => setFullscreenMenuOpen(true)
  const handleFullscreenMenuClose = () => setFullscreenMenuOpen(false)

  return (
    <AuthGuard>
      <StyledDriverLayout>
        {isWebView && <SidePanel />}
        <StyledDriverLayoutContent isWebView={isWebView}>
          {isWebView ? (
            <Topbar />
          ) : (
            <MobileTopbar
              handleFullscreenMenuOpen={handleFullscreenMenuOpen}
              handleFullscreenMenuClose={handleFullscreenMenuClose}
            />
          )}
          {props.children}
        </StyledDriverLayoutContent>
      </StyledDriverLayout>
    </AuthGuard>
  )
}

export default DriverLayout
