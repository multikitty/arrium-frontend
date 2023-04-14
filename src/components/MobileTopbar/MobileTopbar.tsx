import React from "react"
import { Badge, Box, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

import {
  StyledMobileTopbar,
  StyledMobileTopbarBrandLogo,
  StyledMobileTopbarBrandLogoContainer,
} from "./MobileTopbar.styled"
import brandLogo from "@/assets/icons/arrium_logo.png"
import { useStore } from "@/store"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { StyledLandingNavbarRightContainerLoginButton as StyledLoginButton } from "@/components/LandingNavbar/LandingNavbar.styled"
import { localStorageUtils } from "@/utils"
import { COUNTRY_CODE } from "@/constants/localStorage"
import routes from "@/constants/routes"

export interface MobileTopbarProps extends PageProps {
  isFullscreenMenuOpen: boolean
  handleFullscreenMenuOpen: () => void
  handleFullscreenMenuClose: () => void
}

const MobileTopbar: React.FC<MobileTopbarProps> = ({
  handleFullscreenMenuClose,
  handleFullscreenMenuOpen,
  isFullscreenMenuOpen,
  country_code,
}) => {
  const { navigateToDefault, navigate } = useNavigate({ country_code })
  const { userStore } = useStore()
  const codeInStorage = localStorageUtils.get(COUNTRY_CODE)

  const handleMenuButtonClick = () => {
    handleFullscreenMenuOpen()
  }

  const handleCloseButtonClick = () => {
    handleFullscreenMenuClose()
  }

  const handleBrandLogoClick = () => {
    navigateToDefault(userStore.currentUser?.role)
    handleFullscreenMenuClose()
  }

  const handleSigninNavigate = () => {
    if (codeInStorage) {
      navigate(routes.signin)
    }
  }

  return (
    <StyledMobileTopbar>
      <Box display="flex">

        <StyledMobileTopbarBrandLogoContainer>
          <StyledMobileTopbarBrandLogo
            src={brandLogo}
            onClick={handleBrandLogoClick}
          />
        </StyledMobileTopbarBrandLogoContainer>
      </Box>
      {isFullscreenMenuOpen ? (
        <IconButton
          size="small"
          onClick={handleCloseButtonClick}
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      ) : (
        <IconButton size="small" onClick={handleMenuButtonClick}>
          <Badge
            color="error"
            overlap="circular"
            badgeContent=" "
            variant="dot"
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
      )}
    </StyledMobileTopbar>
  )
}

export default MobileTopbar
