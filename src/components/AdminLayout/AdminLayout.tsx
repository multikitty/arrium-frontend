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

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, roles }) => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <AuthGuard roles={roles}>
      <StyledAdminLayout>
        <SidePanel role={UserRoles.admin} />
        <StyledAdminLayoutContent isWebView={isWebView}>
          <Topbar />
          {children}
        </StyledAdminLayoutContent>
      </StyledAdminLayout>
    </AuthGuard>
  )
}

export default AdminLayout
