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
import { PageProps } from "@/lib/interfaces/common"

export interface DriverLayoutProps extends PageProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const DriverLayout: React.FC<DriverLayoutProps> = ({
  children,
  roles,
  country_code,
}) => {
  const { commonStore } = useStore()
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState(false)
  const isDesktopView = useMediaQuery(devices.desktop.up)

  const handleFullscreenMenuOpen = () => setFullscreenMenuOpen(true)
  const handleFullscreenMenuClose = () => setFullscreenMenuOpen(false)

  return (
    <AuthGuard roles={roles} country_code={country_code}>
      <StyledDriverLayout>
        {isDesktopView && (
          <SidePanel role={UserRoles.driver} country_code={country_code} />
        )}
        <StyledDriverLayoutContent
          isDesktopView={isDesktopView}
          isCollapsed={commonStore.isSidePanelCollapsed}
        >
          <React.Fragment>
            {isDesktopView ? (
              <Topbar country_code={country_code} />
            ) : (
              <React.Fragment>
                <MobileTopbar
                  handleFullscreenMenuOpen={handleFullscreenMenuOpen}
                  handleFullscreenMenuClose={handleFullscreenMenuClose}
                  isFullscreenMenuOpen={isFullscreenMenuOpen}
                  country_code={country_code}
                />
                <FullscreenMenu
                  open={isFullscreenMenuOpen}
                  handleFullscreenMenuClose={handleFullscreenMenuClose}
                  country_code={country_code}
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
