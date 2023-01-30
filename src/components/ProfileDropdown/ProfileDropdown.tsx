import React from "react"
import {
  Box,
  CircularProgress,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import SettingsIcon from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import { rem } from "polished"
import { observer } from "mobx-react-lite"

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
import { useStore } from "@/store"
import { UserRoles } from "@/constants/common"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { useCurrentUser } from "@/agent/user"
import { IPageProps } from "@/lib/interfaces/common"

interface IProfileDropdownProps extends IPageProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
}

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({
  handleClose,
  anchorEl,
  open,
  country_code,
  lang,
}) => {
  const { navigate } = useNavigate({ country_code, lang })
  const { userStore } = useStore()
  const { data: currentUserData, isLoading } = useCurrentUser()

  const handleEmailVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
  }

  const handlePhoneVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
  }

  const handleSettingsButtonClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
    e.stopPropagation()
    navigate(routes.profile)
  }

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
    e.stopPropagation()
    userStore.logout()
    navigate(routes.home)
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
      {isLoading ? (
        <Box my={2} mx={8}>
          <CircularProgress size={32} />
        </Box>
      ) : (
        <React.Fragment>
          <StyledProfileDropdownUpperSection>
            <StyledProfileDropdownUpperSectionUsername>
              {currentUserData?.data?.firstname || ""}{" "}
              {currentUserData?.data?.lastname || ""}
            </StyledProfileDropdownUpperSectionUsername>
            <StyledProfileDropdownUpperSectionVerificationContainer>
              <Box display="flex" alignItems="center" mr={1}>
                <CheckCircleOutlineIcon
                  sx={{
                    color: currentUserData?.data?.emailVerified
                      ? theme.palette.common.green
                      : theme.palette.grey3,
                    fontSize: 24,
                  }}
                />
              </Box>
              <StyledProfileDropdownUpperSectionVerificationText>
                {currentUserData?.data?.email || ""}
              </StyledProfileDropdownUpperSectionVerificationText>
              <StyledFlexGrow />
              {currentUserData?.data?.emailVerified || (
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
                    color: currentUserData?.data?.phoneVerified
                      ? theme.palette.common.green
                      : theme.palette.grey3,
                    fontSize: 24,
                  }}
                />
              </Box>
              <StyledProfileDropdownUpperSectionVerificationText>
                {currentUserData?.data?.phoneNumber || ""}
              </StyledProfileDropdownUpperSectionVerificationText>
              <StyledFlexGrow />
              {currentUserData?.data?.phoneVerified || (
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
        </React.Fragment>
      )}
    </Menu>
  )
}

export default observer(ProfileDropdown)
