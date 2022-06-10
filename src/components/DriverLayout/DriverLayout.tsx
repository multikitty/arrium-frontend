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
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"

export interface DriverLayoutProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const DriverLayout = ({ children, roles }: DriverLayoutProps) => {
  const { commonStore } = useStore()
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState(false)
  const isDesktopView = useMediaQuery(devices.desktop.up)

  const handleFullscreenMenuOpen = () => setFullscreenMenuOpen(true)
  const handleFullscreenMenuClose = () => setFullscreenMenuOpen(false)

  return (
    <AuthGuard roles={roles}>
      <StyledDriverLayout>
        {isDesktopView && <SidePanel role={UserRoles.driver} />}
        <StyledDriverLayoutContent
          isDesktopView={isDesktopView}
          isCollapsed={commonStore.isSidePanelCollapsed}
        >
          <React.Fragment>
            {isDesktopView ? (
              <Topbar />
            ) : (
              <React.Fragment>
                <MobileTopbar
                  handleFullscreenMenuOpen={handleFullscreenMenuOpen}
                  handleFullscreenMenuClose={handleFullscreenMenuClose}
                  isFullscreenMenuOpen={isFullscreenMenuOpen}
                />
                <FullscreenMenu
                  open={isFullscreenMenuOpen}
                  handleFullscreenMenuClose={handleFullscreenMenuClose}
                />
              </React.Fragment>
            )}
            {children}
          </React.Fragment>
        </StyledDriverLayoutContent>
      </StyledDriverLayout>
    </AuthGuard>
  )
}

export default observer(DriverLayout)
