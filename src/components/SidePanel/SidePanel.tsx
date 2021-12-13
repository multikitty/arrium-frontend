import React from "react"
import { navigate } from "gatsby"
import {
  StyledSidePanel,
  StyledSidePanelBrandLogo,
  StyledSidePanelBrandLogoContainer,
  StyledSidePanelItem,
  StyledSidePanelItemIcon,
  StyledSidePanelItemList,
  StyledSidePanelItemText,
} from "./SidePanel.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { useLocation } from "@reach/router"
import { DriverPages } from "../../types/common"
import SearchIcon from "../../assets/icons/sidepanel_driver-search_icon.inline.svg"
import SubscriptionIcon from "../../assets/icons/sidepanel_driver-subscription_icon.inline.svg"
import FAQIcon from "../../assets/icons/sidepanel_driver-faq_icon.inline.svg"
import SupportIcon from "../../assets/icons/sidepanel_driver-support_icon.inline.svg"

const SidePanel = () => {
  const { pathname } = useLocation()

  const isBlockAvailibityPage = pathname.includes(
    `/${DriverPages.blockAvailability}`
  )
  const isSubscriptionPage = pathname.includes(`/${DriverPages.subscription}`)
  const isFAQsPage = pathname.includes(`/${DriverPages.faq}`)
  const isSupportPage = pathname.includes(`/${DriverPages.support}`)

  const handleNavigateToHomePage = () => navigate("/")
  const handleNavigateToBlockAvailibityPage = () =>
    navigate(`/${DriverPages.blockAvailability}`)
  const handleNavigateToSubscriptionPage = () =>
    navigate(`/${DriverPages.subscription}`)
  const handleNavigateToFAQsPage = () => navigate(`/${DriverPages.faq}`)
  const handleNavigateToSupportPage = () => navigate(`/${DriverPages.support}`)

  return (
    <StyledSidePanel>
      <StyledSidePanelBrandLogoContainer>
        <StyledSidePanelBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHomePage}
        />
      </StyledSidePanelBrandLogoContainer>
      <StyledSidePanelItemList>
        <StyledSidePanelItem
          active={isBlockAvailibityPage}
          onClick={handleNavigateToBlockAvailibityPage}
        >
          <StyledSidePanelItemIcon active={isBlockAvailibityPage}>
            <SearchIcon />
          </StyledSidePanelItemIcon>
          <StyledSidePanelItemText>Block availability</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledSidePanelItem
          active={isSubscriptionPage}
          onClick={handleNavigateToSubscriptionPage}
        >
          <StyledSidePanelItemIcon active={isSubscriptionPage}>
            <SubscriptionIcon />
          </StyledSidePanelItemIcon>
          <StyledSidePanelItemText>Subscription</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledSidePanelItem
          active={isFAQsPage}
          onClick={handleNavigateToFAQsPage}
        >
          <StyledSidePanelItemIcon active={isFAQsPage}>
            <FAQIcon />
          </StyledSidePanelItemIcon>
          <StyledSidePanelItemText>FAQs</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledFlexGrow />
        <StyledSidePanelItem
          active={isSupportPage}
          onClick={handleNavigateToSupportPage}
        >
          <StyledSidePanelItemIcon active={isSupportPage}>
            <SupportIcon />
          </StyledSidePanelItemIcon>
          <StyledSidePanelItemText>Support</StyledSidePanelItemText>
        </StyledSidePanelItem>
      </StyledSidePanelItemList>
    </StyledSidePanel>
  )
}

export default SidePanel
