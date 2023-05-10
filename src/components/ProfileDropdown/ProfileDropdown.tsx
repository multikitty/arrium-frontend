import React from "react"
import {
  Box,
  CircularProgress,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material"
import CheckCircleOutlineIcon from "@/assets/icons/main-check-circle_user_pop_up_verify.svg"

import CheckCircleUnverifiedOutlineIcon from "@/assets/icons/main-check-circle_user_pop_up_unverified.svg"
import SettingsIcon from "@/assets/icons/user_pop_up_setting_icon.svg"
import SettingsIconHover from "@/assets/icons/user_pop_up_setting_icon_hover.svg"
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
import { requestEmailVerify, useCurrentUser } from "@/agent/user"
import { PageProps } from "@/lib/interfaces/common"
import { getRawPhoneNumber } from "@/utils/getRawPhoneNumber"
import { useMutation } from "react-query"
import { RequestEmailVerifyResult, RequestEmailVerifyVariables } from "@/lib/interfaces/user"
// import { useSnackbar } from "notistack"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification} from '@/components/ToastNotification/ToastNotification';


interface ProfileDropdownProps extends PageProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  handleClose,
  anchorEl,
  open,
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const { userStore } = useStore()
  const { data: currentUserData, isLoading } = useCurrentUser()
  // const { enqueueSnackbar } = useSnackbar()
  const { mutate: requestEmailVerifyMutate } = useMutation<
    RequestEmailVerifyResult,
    Error,
    RequestEmailVerifyVariables
  >(requestEmailVerify)

  const handleEmailVerificationClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = async (e) => {
      e.stopPropagation();
      await requestEmailVerifyMutate(
        { email: currentUserData.data.email },
        {
          onSuccess({ success, message, validationError }) {
            if (!success) {
              toast.error(validationError?.email || message)
              return
            }
            toast.success(message)
          },
          onError(error, variables) {
            toast.error(error.message)
          },
        }
      )
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
      sx={{
        left: 12
      }}
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
            right: 29,
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
    <ToastNotification/>
      <React.Fragment>
        {currentUserData?.data && (
          <StyledProfileDropdownUpperSection>
            {currentUserData.data?.firstname && currentUserData.data?.lastname && (
              <StyledProfileDropdownUpperSectionUsername>
                {currentUserData.data.firstname} {currentUserData.data.lastname}
              </StyledProfileDropdownUpperSectionUsername>
            )}
            {currentUserData.data && (
              <StyledProfileDropdownUpperSectionVerificationContainer>
                <Box display="flex" alignItems="center" mr={1}>
                  <img src={currentUserData.data.emailVerified ? CheckCircleOutlineIcon : CheckCircleUnverifiedOutlineIcon} alt="" width={24} />
                </Box>
                <StyledProfileDropdownUpperSectionVerificationText>
                  {currentUserData.data.email}
                </StyledProfileDropdownUpperSectionVerificationText>
                <StyledFlexGrow />
                {!currentUserData.data.emailVerified && (
                  <StyledProfileDropdownUpperSectionVerificationButton
                    onClick={handleEmailVerificationClick}
                  >
                    Verify
                  </StyledProfileDropdownUpperSectionVerificationButton>
                )}
              </StyledProfileDropdownUpperSectionVerificationContainer>
            )}
            {currentUserData.data && (
              <StyledProfileDropdownUpperSectionVerificationContainer>
                <Box display="flex" alignItems="center" mr={1}>
                  <img src={currentUserData.data.phoneVerified ? CheckCircleOutlineIcon : CheckCircleUnverifiedOutlineIcon} width={24} />
                </Box>
                <StyledProfileDropdownUpperSectionVerificationText>
                  {`+${currentUserData.data.dialCode}${currentUserData.data.phoneNumber}`}
                </StyledProfileDropdownUpperSectionVerificationText>
                <StyledFlexGrow />
                {!currentUserData.data.phoneVerified && (
                  <StyledProfileDropdownUpperSectionVerificationButton
                    onClick={handlePhoneVerificationClick}
                  >
                    Verify
                  </StyledProfileDropdownUpperSectionVerificationButton>
                )}
              </StyledProfileDropdownUpperSectionVerificationContainer>
            )}
          </StyledProfileDropdownUpperSection>
        )}
        {isLoading ? (
          <Box my={2} mx={8}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <React.Fragment>
            <Divider />
            {userStore.currentUser?.role === UserRoles.driver && (
              <MenuItem
                dense
                divider
                sx={{
                  py: rem("12px"), "&:hover": {
                    "&, & .MuiListItemIcon-root": {
                      "img": {
                        content: `url(${SettingsIconHover})`
                      }
                    }
                  }
                }}
                onClick={handleSettingsButtonClick}
              >
                <ListItemIcon>
                  <img src={SettingsIcon} alt="" width={24} className="logo-img" />
                </ListItemIcon>
                <StyledProfileDropdownMenuItemText>
                  Settings
                </StyledProfileDropdownMenuItemText>
              </MenuItem>
            )}
            <MenuItem
              dense
              sx={{
                py: rem("12px"),
                "&:hover": {
                  "&, & .MuiListItemIcon-root": {
                    color: "#3071F2"
                  }
                }
              }}
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
      </React.Fragment>
    </Menu>
  )
}

export default observer(ProfileDropdown)
