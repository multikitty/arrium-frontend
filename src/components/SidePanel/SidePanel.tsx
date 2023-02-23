import * as React from "react"
import { useLocation } from "@reach/router"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import {
  StyledSidePanel,
  StyledSidePanelBrandLogo,
  StyledSidePanelBrandLogoContainer,
  StyledSidePanelItem,
  StyledSidePanelItemIcon,
  StyledSidePanelItemList,
  StyledSidePanelItemText,
} from "./SidePanel.styled"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import brandLogo from "@/assets/icons/arrium_logo.png"
import brandLogoSmall from "@/assets/icons/arrium_logo--small.png"
import sidePanelData from "./SidePanel.data"
import { useStore } from "@/store"
import routes from "@/constants/routes"
import { IconButton } from "@mui/material"
import { observer } from "mobx-react-lite"
import useNavigate from "@/hooks/useNavigate"
import { DriverPages } from "@/constants/common"
import { UserRolesType } from "@/types/common"
import { PageProps } from "@/lib/interfaces/common"

interface SidePanelProps extends PageProps {
  role: UserRolesType
}

const SidePanel: React.FC<SidePanelProps> = ({ country_code }) => {
  const { pathname } = useLocation()
  const { navigate } = useNavigate({ country_code })
  const { userStore, commonStore } = useStore()

  const handleNavigateToHomePage = () => {
    navigate(routes.home)
  }

  const handleCollapseButtonClick = () => {
    commonStore.toggleSidePanelCollapsed()
  }

  const renderSidePanelItem = (
    active: boolean,
    href: string,
    Icon: React.FunctionComponent<any>,
    label: string
  ) =>
    (userStore?.currentUser?.planType &&
      userStore.currentUser.planType !== "premium" &&
      href === DriverPages.automationSchedule) || (
      <StyledSidePanelItem
        active={active}
        collapsed={commonStore.isSidePanelCollapsed}
        onClick={() => navigate(`/${href}`)}
      >
        <StyledSidePanelItemIcon
          active={active}
          collapsed={commonStore.isSidePanelCollapsed}
        >
          <Icon />
        </StyledSidePanelItemIcon>
        {commonStore.isSidePanelCollapsed || (
          <StyledSidePanelItemText>{label}</StyledSidePanelItemText>
        )}
      </StyledSidePanelItem>
    )

  return (
    <StyledSidePanel collapsed={commonStore.isSidePanelCollapsed}>
      <IconButton
        size="small"
        sx={{ backgroundColor: "#FFF" }}
        className="side-panel--collapse-btn"
        onClick={handleCollapseButtonClick}
      >
        {commonStore.isSidePanelCollapsed ? (
          <ChevronRightIcon fontSize="small" />
        ) : (
          <ChevronLeftIcon fontSize="small" />
        )}
      </IconButton>
      <StyledSidePanelBrandLogoContainer>
        <StyledSidePanelBrandLogo
          $type={commonStore.isSidePanelCollapsed ? "small" : "large"}
          src={commonStore.isSidePanelCollapsed ? brandLogoSmall : brandLogo}
          onClick={handleNavigateToHomePage}
        />
      </StyledSidePanelBrandLogoContainer>
      <StyledSidePanelItemList>
        {sidePanelData
          .filter(d => d.roles.includes(userStore.currentUser?.role as never))
          .map(data => (
            <React.Fragment key={data.label}>
              {data.isSpaceAbove && <StyledFlexGrow />}
              {renderSidePanelItem(
                pathname.includes(data.href),
                data.href,
                data.icon as React.FunctionComponent<any>,
                data.label
              )}
            </React.Fragment>
          ))}
      </StyledSidePanelItemList>
    </StyledSidePanel>
  )
}

export default observer(SidePanel)
