import React from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"

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
import { SidePanelProps } from "./SidePanel.types"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import sidePanelData from "./SidePanel.data"
import { useStore } from "@/store"

const SidePanel: React.FC<SidePanelProps> = () => {
  const { pathname } = useLocation()
  const { userStore } = useStore()

  const handleNavigateToHomePage = () => navigate("/")

  const renderSidePanelItem = (
    active: boolean,
    href: string,
    Icon: React.FunctionComponent<any>,
    label: string
  ) => (
    <StyledSidePanelItem active={active} onClick={() => navigate(`/${href}`)}>
      <StyledSidePanelItemIcon active={active}>
        <Icon />
      </StyledSidePanelItemIcon>
      <StyledSidePanelItemText>{label}</StyledSidePanelItemText>
    </StyledSidePanelItem>
  )

  return (
    <StyledSidePanel>
      <StyledSidePanelBrandLogoContainer>
        <StyledSidePanelBrandLogo
          src={brandLogo}
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

export default SidePanel
