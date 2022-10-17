import React, { useState } from "react"
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
import { ContainedButton } from "../commons/Button"
import { useStore } from "@/store"
import FullscreenMenuNotifications from "./FullscreenMenuNotifications"
import { driverNavigationData } from "./FullscreenMenu.data"
import { Settings } from "@mui/icons-material"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

export interface IFullscreenMenuProps extends IPageProps {
  open: boolean
  handleFullscreenMenuClose: () => void
}

const FullscreenMenu = ({
  open,
  handleFullscreenMenuClose,
  country_code,
  lang,
}: IFullscreenMenuProps) => {
  const { navigate } = useNavigate({ country_code, lang })
  const { userStore } = useStore()
  const { pathname } = useLocation()
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)

  const handleNotificationsMenuOpen = () => setIsNotificationsMenuOpen(true)
  const handleNotificationsMenuClose = () => setIsNotificationsMenuOpen(false)

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.logout()
    navigate(routes.home)
    handleFullscreenMenuClose()
  }

  const handleProfileItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    e.stopPropagation()
    navigate(routes.profile)
    handleFullscreenMenuClose()
  }

  const handleNotificationsItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    e.stopPropagation()
    handleNotificationsMenuOpen()
  }

  const handleNavigationItemClick = (href: string) => {
    handleFullscreenMenuClose()
    navigate(href)
  }

  const navigationItemsJSX = driverNavigationData.map(data => (
    <StyledFullscreenMenuBottomContainerItem
      key={data.href}
      active={pathname.includes(data.href)}
      onClick={() => handleNavigationItemClick(`/${data.href}`)}
    >
      <StyledFullscreenMenuBottomContainerItemIcon
        active={pathname.includes(data.href)}
      >
        {<data.icon />}
      </StyledFullscreenMenuBottomContainerItemIcon>
      <StyledFullscreenMenuBottomContainerItemText>
        {data.label}
      </StyledFullscreenMenuBottomContainerItemText>
    </StyledFullscreenMenuBottomContainerItem>
  ))

  return (
    <StyledFullscreenMenu visible={open}>
      {isNotificationsMenuOpen ? (
        <FullscreenMenuNotifications
          handleClose={handleNotificationsMenuClose}
        />
      ) : (
        <React.Fragment>
          <StyledFullscreenMenuUpperContainer>
            <StyledFullscreenMenuUpperContainerItem
              active={pathname.includes("profile")}
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
              <Settings
                sx={{
                  ml: 1,
                  color: pathname.includes("profile")
                    ? theme.palette.main
                    : theme.palette.grey6,
                  cursor: "pointer",
                }}
              />
            </StyledFullscreenMenuUpperContainerItem>
            <StyledFullscreenMenuUpperContainerItem
              last
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
            {navigationItemsJSX}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <ContainedButton onClick={handleLogoutButtonClick}>
                Logout
              </ContainedButton>
            </Box>
          </StyledFullscreenMenuBottomContainer>
        </React.Fragment>
      )}
    </StyledFullscreenMenu>
  )
}

export default FullscreenMenu
