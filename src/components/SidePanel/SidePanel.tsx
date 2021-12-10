import React from "react"
import { navigate } from "gatsby"
import {
  StyledSidePanel,
  StyledSidePanelBrandLogo,
  StyledSidePanelBrandLogoContainer,
  StyledSidePanelItem,
  StyledSidePanelItemList,
  StyledSidePanelItemText,
} from "./SidePanel.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import SearchIcon from "@mui/icons-material/Search"
import { Box } from "@mui/material"
import theme from "../../theme"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { useLocation } from "@reach/router"
import { rem } from "polished"
import { DriverPages } from "../../types/common"

const SidePanel = () => {
  const { pathname } = useLocation()

  const isBlockAvailibityPage = pathname === `/${DriverPages.blockAvailability}`
  const isSubscriptionPage = pathname === `/${DriverPages.subscription}`
  const isFAQsPage = pathname === `/${DriverPages.faq}`
  const isSupportPage = pathname === `/${DriverPages.support}`

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
          <Box mr={rem("12px")}>
            <SearchIcon
              sx={{
                fontSize: 24,
                color: isBlockAvailibityPage
                  ? theme.palette.main
                  : "InactiveCaptionText",
              }}
            />
          </Box>
          <StyledSidePanelItemText>Block availability</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledSidePanelItem
          active={isSubscriptionPage}
          onClick={handleNavigateToSubscriptionPage}
        >
          <Box mr={rem("12px")}>
            <SearchIcon
              sx={{
                fontSize: 24,
                color: isSubscriptionPage
                  ? theme.palette.main
                  : "InactiveCaptionText",
              }}
            />
          </Box>
          <StyledSidePanelItemText>Subscription</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledSidePanelItem
          active={isFAQsPage}
          onClick={handleNavigateToFAQsPage}
        >
          <Box mr={rem("12px")}>
            <SearchIcon
              sx={{
                fontSize: 24,
                color: isFAQsPage ? theme.palette.main : "InactiveCaptionText",
              }}
            />
          </Box>
          <StyledSidePanelItemText>FAQs</StyledSidePanelItemText>
        </StyledSidePanelItem>
        <StyledFlexGrow />
        <StyledSidePanelItem
          active={isSupportPage}
          onClick={handleNavigateToSupportPage}
        >
          <Box mr={rem("12px")}>
            <SearchIcon
              sx={{
                fontSize: 24,
                color: isSupportPage
                  ? theme.palette.main
                  : "InactiveCaptionText",
              }}
            />
          </Box>
          <StyledSidePanelItemText>Support</StyledSidePanelItemText>
        </StyledSidePanelItem>
      </StyledSidePanelItemList>
    </StyledSidePanel>
  )
}

export default SidePanel
