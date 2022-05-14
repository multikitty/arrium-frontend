import React, { useState } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { Avatar, Badge, Box } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { rem } from "polished"

import theme from "@/theme"
import {
  StyledFullscreenMenu,
  StyledFullscreenMenuBottomContainer,
  StyledFullscreenMenuBottomContainerItem,
  StyledFullscreenMenuBottomContainerItemIcon,
  StyledFullscreenMenuBottomContainerItemText,
  StyledFullscreenMenuUpperContainer,
  StyledFullscreenMenuUpperContainerItem,
  StyledFullscreenMenuUpperContainerItemText,
  StyledFullscreenMenuUpperContainerNotificationIcon,
} from "./FullscreenMenu.styled"
import SearchIcon from "@/assets/icons/sidepanel_driver-search_icon.inline.svg"
import SubscriptionIcon from "@/assets/icons/sidepanel_driver-subscription_icon.inline.svg"
import FAQIcon from "@/assets/icons/sidepanel_driver-faq_icon.inline.svg"
import SupportIcon from "@/assets/icons/sidepanel_driver-support_icon.inline.svg"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { ContainedButton } from "../commons/Button"
import { useStore } from "@/store"
import FullscreenMenuNotifications from "./FullscreenMenuNotifications"
import { FullscreenMenuProps } from "./FullScreenMenu.types."
import { DriverPages } from "@/constants/common"

const FullscreenMenu = ({ open }: FullscreenMenuProps) => {
  const { userStore } = useStore()
  const { pathname } = useLocation()
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)

  const handleNotificationsMenuOpen = () => setIsNotificationsMenuOpen(true)
  const handleNotificationsMenuClose = () => setIsNotificationsMenuOpen(false)

  const isBlockAvailibityPage = pathname === `/${DriverPages.availability}`
  const isSubscriptionPage = pathname === `/${DriverPages.subscription}`
  const isFAQsPage = pathname === `/${DriverPages.faq}`
  const isSupportPage = pathname === `/${DriverPages.support}`

  const handleNavigateToBlockAvailibityPage = () =>
    navigate(`/${DriverPages.availability}`)
  const handleNavigateToSubscriptionPage = () =>
    navigate(`/${DriverPages.subscription}`)
  const handleNavigateToFAQsPage = () => navigate(`/${DriverPages.faq}`)
  const handleNavigateToSupportPage = () => navigate(`/${DriverPages.support}`)

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.logout()
  }

  const handleProfileItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    e.stopPropagation()
    navigate(`/profile`)
  }

  const handleNotificationsItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    e.stopPropagation()
    handleNotificationsMenuOpen()
  }

  return (
    <StyledFullscreenMenu visible={open}>
      {isNotificationsMenuOpen ? (
        <FullscreenMenuNotifications
          handleClose={handleNotificationsMenuClose}
        />
      ) : (
        <>
          <StyledFullscreenMenuUpperContainer>
            <StyledFullscreenMenuUpperContainerItem
              onClick={handleProfileItemClick}
            >
              <Box mr={rem("12px")}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                >
                  {userStore.userInitials}
                </Avatar>
              </Box>
              <StyledFullscreenMenuUpperContainerItemText>
                {userStore.userFullName}
              </StyledFullscreenMenuUpperContainerItemText>
            </StyledFullscreenMenuUpperContainerItem>
            <StyledFullscreenMenuUpperContainerItem
              onClick={handleNotificationsItemClick}
            >
              <Box mr={rem("12px")}>
                <Badge
                  color="error"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <StyledFullscreenMenuUpperContainerNotificationIcon>
                    <NotificationsNoneIcon
                      sx={{ fontSize: 24, color: theme.palette.main }}
                    />
                  </StyledFullscreenMenuUpperContainerNotificationIcon>
                </Badge>
              </Box>
              <StyledFullscreenMenuUpperContainerItemText>
                Notifications
              </StyledFullscreenMenuUpperContainerItemText>
            </StyledFullscreenMenuUpperContainerItem>
          </StyledFullscreenMenuUpperContainer>
          <StyledFullscreenMenuBottomContainer>
            <StyledFullscreenMenuBottomContainerItem
              active={isBlockAvailibityPage}
              onClick={handleNavigateToBlockAvailibityPage}
            >
              <StyledFullscreenMenuBottomContainerItemIcon
                active={isBlockAvailibityPage}
              >
                <SearchIcon />
              </StyledFullscreenMenuBottomContainerItemIcon>
              <StyledFullscreenMenuBottomContainerItemText>
                Block availability
              </StyledFullscreenMenuBottomContainerItemText>
            </StyledFullscreenMenuBottomContainerItem>
            <StyledFullscreenMenuBottomContainerItem
              active={isSubscriptionPage}
              onClick={handleNavigateToSubscriptionPage}
            >
              <StyledFullscreenMenuBottomContainerItemIcon
                active={isSubscriptionPage}
              >
                <SubscriptionIcon />
              </StyledFullscreenMenuBottomContainerItemIcon>
              <StyledFullscreenMenuBottomContainerItemText>
                Subscription
              </StyledFullscreenMenuBottomContainerItemText>
            </StyledFullscreenMenuBottomContainerItem>
            <StyledFullscreenMenuBottomContainerItem
              active={isFAQsPage}
              onClick={handleNavigateToFAQsPage}
            >
              <StyledFullscreenMenuBottomContainerItemIcon active={isFAQsPage}>
                <FAQIcon />
              </StyledFullscreenMenuBottomContainerItemIcon>
              <StyledFullscreenMenuBottomContainerItemText>
                FAQs
              </StyledFullscreenMenuBottomContainerItemText>
            </StyledFullscreenMenuBottomContainerItem>
            <StyledFullscreenMenuBottomContainerItem
              active={isSupportPage}
              onClick={handleNavigateToSupportPage}
            >
              <StyledFullscreenMenuBottomContainerItemIcon
                active={isSupportPage}
              >
                <SupportIcon />
              </StyledFullscreenMenuBottomContainerItemIcon>
              <StyledFullscreenMenuBottomContainerItemText>
                Support
              </StyledFullscreenMenuBottomContainerItemText>
            </StyledFullscreenMenuBottomContainerItem>
            <StyledFlexGrow />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={6}
            >
              <ContainedButton onClick={handleLogoutButtonClick}>
                Logout
              </ContainedButton>
            </Box>
          </StyledFullscreenMenuBottomContainer>
        </>
      )}
    </StyledFullscreenMenu>
  )
}

export default FullscreenMenu
