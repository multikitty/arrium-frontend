import React from "react"
import AuthGuard from "../AuthGuard"
import SidePanel from "../SidePanel"
import Topbar from "../Topbar"
import {
  StyledAdminLayout,
  StyledAdminLayoutContent,
} from "./AdminLayout.styled"
import { UserRoles } from "@/constants/common"
import { devices } from "@/constants/device"
import { useMediaQuery } from "@mui/material"
import { AdminLayoutProps } from "./AdminLayout.types"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, roles }) => {
  const { commonStore } = useStore()
  const isDesktopView = useMediaQuery(devices.web.up)

  return (
    <AuthGuard roles={roles}>
      <StyledAdminLayout>
        <SidePanel role={UserRoles.admin} />
        <StyledAdminLayoutContent
          isDesktopView={isDesktopView}
          isCollapsed={commonStore.isSidePanelCollapsed}
        >
          <Topbar />
          {children}
        </StyledAdminLayoutContent>
      </StyledAdminLayout>
    </AuthGuard>
  )
}

export default observer(AdminLayout)
