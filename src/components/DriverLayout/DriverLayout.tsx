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
import FullscreenMenu from "../FullscreenMenu"
import { UserRoles } from "../../types/common"
import { ChildrenProps } from "../AdminLayout/AdminLayout.types"

const DriverLayout = ({ children }: ChildrenProps) => {
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState<boolean>(false)
  const isWebView = useMediaQuery(devices.web.up)

  const handleFullscreenMenuOpen = () => setFullscreenMenuOpen(true)
  const handleFullscreenMenuClose = () => setFullscreenMenuOpen(false)

  return (
    <AuthGuard role={UserRoles.driver}>
      <StyledDriverLayout>
        {isWebView && <SidePanel role={UserRoles.driver} />}
        <StyledDriverLayoutContent isWebView={isWebView}>
          {isWebView ? (
            <Topbar />
          ) : (
            <MobileTopbar
              handleFullscreenMenuOpen={handleFullscreenMenuOpen}
              handleFullscreenMenuClose={handleFullscreenMenuClose}
              isFullscreenMenuOpen={isFullscreenMenuOpen}
            />
          )}
          {!isWebView && <FullscreenMenu open={isFullscreenMenuOpen} />}
          {children}
        </StyledDriverLayoutContent>
      </StyledDriverLayout>
    </AuthGuard>
  )
}

export default DriverLayout
