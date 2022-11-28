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
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import { IPageProps } from "@/lib/interfaces/common"

interface IAdminLayoutProps extends IPageProps {
  children: React.ReactNode
  roles: UserRolesType[]
}

const AdminLayout: React.FC<IAdminLayoutProps> = ({
  children,
  roles,
  country_code,
}) => {
  const { commonStore } = useStore()
  const isDesktopView = useMediaQuery(devices.web.up)

  return (
    <AuthGuard roles={roles} country_code={country_code}>
      <StyledAdminLayout>
        <SidePanel role={UserRoles.admin} country_code={country_code} />
        <StyledAdminLayoutContent
          isDesktopView={isDesktopView}
          isCollapsed={commonStore.isSidePanelCollapsed}
        >
          <React.Fragment>
            <Topbar />
            {children}
          </React.Fragment>
        </StyledAdminLayoutContent>
      </StyledAdminLayout>
    </AuthGuard>
  )
}

export default observer(AdminLayout)
