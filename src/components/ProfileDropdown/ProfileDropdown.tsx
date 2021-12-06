import React, { useState } from "react"
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
import theme from "../../theme"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"

interface IProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
}

const ProfileDropdown = ({ handleClose, anchorEl, open }: IProps) => {
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false)
  const [isPhoneVerified, setPhoneVerified] = useState<boolean>(false)

  const handleEmailVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    setEmailVerified(true)
  }

  const handlePhoneVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    setPhoneVerified(true)
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
          mt: 1.5,
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
          Eliza Doolittle
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
            eliza.doolittle@gmail.com
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
            +44 12 34 5678
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
      <MenuItem dense divider sx={{ py: rem("12px") }}>
        <ListItemIcon>
          <SettingsIcon sx={{ fontSize: 24 }} />
        </ListItemIcon>
        <StyledProfileDropdownMenuItemText>
          Settings
        </StyledProfileDropdownMenuItemText>
      </MenuItem>
      <MenuItem dense sx={{ py: rem("12px") }}>
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

export default ProfileDropdown
