import React from "react"
import AuthGuard from "../AuthGuard"
import SidePanel from "../SidePanel"
import Topbar from "../Topbar"
import {
  StyledAdminLayout,
  StyledAdminLayoutContent,
} from "./AdminLayout.styled"
import { UserRoles } from "../../types/common"
import { devices } from "../../constants/device"
import { useMediaQuery } from "@mui/material"

interface Props {
  children: React.ReactNode
}

const AdminLayout = (props: Props) => {
  const isWebView = useMediaQuery(devices.web.up)

  return (
    <AuthGuard role={UserRoles.admin}>
      <StyledAdminLayout>
        <SidePanel role={UserRoles.admin} />
        <StyledAdminLayoutContent isWebView={isWebView}>
          <Topbar />
          {props.children}
        </StyledAdminLayoutContent>
      </StyledAdminLayout>
    </AuthGuard>
  )
}

export default AdminLayout
