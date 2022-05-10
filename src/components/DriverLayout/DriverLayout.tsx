import React, { useState } from "react"
import { useMediaQuery } from "@mui/material"

import { devices } from "@/constants/device"
import MobileTopbar from "../MobileTopbar"
import AuthGuard from "../AuthGuard"
import SidePanel from "../SidePanel"
import Topbar from "../Topbar"
import {
  StyledDriverLayout,
  StyledDriverLayoutContent,
} from "./DriverLayout.styled"
import FullscreenMenu from "../FullscreenMenu"
import { UserRoles } from "@/constants/common"
import { UserRolesType } from "@/types/common"

export interface DriverLayoutProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const DriverLayout = ({ children, roles }: DriverLayoutProps) => {
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState(false)
  const isDesktopView = useMediaQuery(devices.desktop.up)

  const handleFullscreenMenuOpen = () => setFullscreenMenuOpen(true)
  const handleFullscreenMenuClose = () => setFullscreenMenuOpen(false)

  return (
    <AuthGuard roles={roles}>
      <StyledDriverLayout>
        {isDesktopView && <SidePanel role={UserRoles.driver} />}
        <StyledDriverLayoutContent isDesktopView={isDesktopView}>
          {isDesktopView ? (
            <Topbar />
          ) : (
            <MobileTopbar
              handleFullscreenMenuOpen={handleFullscreenMenuOpen}
              handleFullscreenMenuClose={handleFullscreenMenuClose}
              isFullscreenMenuOpen={isFullscreenMenuOpen}
            />
          )}
          {!isDesktopView && <FullscreenMenu open={isFullscreenMenuOpen} />}
          {children}
        </StyledDriverLayoutContent>
      </StyledDriverLayout>
    </AuthGuard>
  )
}

export default DriverLayout
