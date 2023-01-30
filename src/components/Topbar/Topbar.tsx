import React from "react"
import { Avatar, Badge, IconButton, Tooltip } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { observer } from "mobx-react-lite"
import { rem } from "polished"

import { StyledTopbar, StyledTopbarNotificationButton } from "./Topbar.styled"
import theme from "@/theme"
import ProfileDropdown from "@/components/ProfileDropdown"
import NotificationsDropdown from "@/components/NotificationsDropdown"
import { useStore } from "@/store"

const Topbar = () => {
  const { userStore } = useStore()
  const [profileDropdownAnchorEl, setProfileDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const profileDropdownOpen = Boolean(profileDropdownAnchorEl)
  const [notificationsDropdownAnchorEl, setNotificationsDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const notificationsDropdownOpen = Boolean(notificationsDropdownAnchorEl)

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileDropdownAnchorEl(event.currentTarget)
  }

  const handleNotificationsIconClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationsDropdownAnchorEl(event.currentTarget)
  }

  const handleProfileDropdownClose = () => {
    setProfileDropdownAnchorEl(null)
  }

  const handleNotificationsDropdownClose = () => {
    setNotificationsDropdownAnchorEl(null)
  }

  return (
    <StyledTopbar>
      <Tooltip title="Notifications">
        <IconButton
          disableRipple
          size="small"
          sx={{ mr: rem("16px") }}
          onClick={handleNotificationsIconClick}
        >
          <Badge
            color="error"
            overlap="circular"
            badgeContent=" "
            variant="dot"
          >
            <StyledTopbarNotificationButton active={notificationsDropdownOpen}>
              <NotificationsNoneIcon
                sx={{ fontSize: 24, color: theme.palette.main }}
              />
            </StyledTopbarNotificationButton>
          </Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title="Account details">
        <IconButton disableRipple onClick={handleAvatarClick} size="small">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: "1px solid transparent",
              borderColor: profileDropdownOpen
                ? theme.palette.main
                : "transparent",
              fontSize: 16,
            }}
          >
            {userStore.userInitials}
          </Avatar>
        </IconButton>
      </Tooltip>
      {profileDropdownOpen && (
        <ProfileDropdown
          anchorEl={profileDropdownAnchorEl}
          open={profileDropdownOpen}
          handleClose={handleProfileDropdownClose}
        />
      )}
      {notificationsDropdownOpen && (
        <NotificationsDropdown
          anchorEl={notificationsDropdownAnchorEl}
          open={notificationsDropdownOpen}
          handleClose={handleNotificationsDropdownClose}
        />
      )}
    </StyledTopbar>
  )
}

export default observer(Topbar)
