import React, { useState } from "react"
import { navigate } from "gatsby"
import { Box, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import SettingsIcon from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import { rem } from "polished"

import {
  StyledProfileDropdownMenuItemText,
  StyledProfileDropdownUpperSection,
  StyledProfileDropdownUpperSectionUsername,
  StyledProfileDropdownUpperSectionVerificationButton,
  StyledProfileDropdownUpperSectionVerificationContainer,
  StyledProfileDropdownUpperSectionVerificationText,
} from "./ProfileDropdown.styled"
import theme from "@/theme"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { ProfileDropDownProps } from "./ProfileDropDown.types"
import { useStore } from "@/store"
import { observer } from "mobx-react-lite"
import { UserRoles } from "@/types/common"

const ProfileDropdown: React.FC<ProfileDropDownProps> = ({
  handleClose,
  anchorEl,
  open,
}) => {
  const { userStore } = useStore()
  const [isEmailVerified, setIsEmailVerified] = useState(
    userStore.currentUser?.isEmailVerified ?? false
  )
  const [isPhoneVerified, setIsPhoneVerified] = useState(
    userStore.currentUser?.isPhoneVerified ?? false
  )

  const handleEmailVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.verifyEmail()
    setIsEmailVerified(true)
  }

  const handlePhoneVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.verifyPhone()
    setIsPhoneVerified(true)
  }

  const handleSettingsButtonClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
    e.stopPropagation()
    navigate("/profile")
  }

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.logout()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1))",
          mt: 2,
          borderRadius: rem("20px"),
          padding: rem("12px"),
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 18,
            width: 14,
            height: 14,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <StyledProfileDropdownUpperSection>
        <StyledProfileDropdownUpperSectionUsername>
          {userStore.userFullName}
        </StyledProfileDropdownUpperSectionUsername>
        <StyledProfileDropdownUpperSectionVerificationContainer>
          <Box display="flex" alignItems="center" mr={1}>
            <CheckCircleOutlineIcon
              sx={{
                color: theme.palette.common.green,
                fontSize: 24,
                opacity: isEmailVerified ? 1 : 0.4,
              }}
            />
          </Box>
          <StyledProfileDropdownUpperSectionVerificationText>
            {userStore.currentUser?.email}
          </StyledProfileDropdownUpperSectionVerificationText>
          <StyledFlexGrow />
          {isEmailVerified || (
            <StyledProfileDropdownUpperSectionVerificationButton
              onClick={handleEmailVerificationClick}
            >
              Verify
            </StyledProfileDropdownUpperSectionVerificationButton>
          )}
        </StyledProfileDropdownUpperSectionVerificationContainer>
        <StyledProfileDropdownUpperSectionVerificationContainer>
          <Box display="flex" alignItems="center" mr={1}>
            <CheckCircleOutlineIcon
              sx={{
                color: theme.palette.common.green,
                fontSize: 24,
                opacity: isPhoneVerified ? 1 : 0.4,
              }}
            />
          </Box>
          <StyledProfileDropdownUpperSectionVerificationText>
            {userStore.currentUser?.phoneNumber}
          </StyledProfileDropdownUpperSectionVerificationText>
          <StyledFlexGrow />
          {isPhoneVerified || (
            <StyledProfileDropdownUpperSectionVerificationButton
              onClick={handlePhoneVerificationClick}
            >
              Verify
            </StyledProfileDropdownUpperSectionVerificationButton>
          )}
        </StyledProfileDropdownUpperSectionVerificationContainer>
      </StyledProfileDropdownUpperSection>
      <Divider />
      {userStore.currentUser?.role === UserRoles.driver && (
        <MenuItem
          dense
          divider
          sx={{ py: rem("12px") }}
          onClick={handleSettingsButtonClick}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <StyledProfileDropdownMenuItemText>
            Settings
          </StyledProfileDropdownMenuItemText>
        </MenuItem>
      )}
      <MenuItem
        dense
        sx={{ py: rem("12px") }}
        onClick={handleLogoutButtonClick}
      >
        <ListItemIcon>
          <Logout sx={{ fontSize: 24 }} />
        </ListItemIcon>
        <StyledProfileDropdownMenuItemText>
          Log Out
        </StyledProfileDropdownMenuItemText>
      </MenuItem>
    </Menu>
  )
}

export default observer(ProfileDropdown)
