import React from "react"
import { Badge, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

import {
  StyledMobileTopbar,
  StyledMobileTopbarBrandLogo,
  StyledMobileTopbarBrandLogoContainer,
} from "./MobileTopbar.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { useStore } from "@/store"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

export interface IMobileTopbarProps extends IPageProps {
  isFullscreenMenuOpen: boolean
  handleFullscreenMenuOpen: () => void
  handleFullscreenMenuClose: () => void
}

const MobileTopbar: React.FC<IMobileTopbarProps> = ({
  handleFullscreenMenuClose,
  handleFullscreenMenuOpen,
  isFullscreenMenuOpen,
  country_code,
  lang,
}) => {
  const { navigateToDefault } = useNavigate({ country_code, lang })
  const { userStore } = useStore()

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

  return (
    <StyledMobileTopbar>
      <StyledMobileTopbarBrandLogoContainer>
        <StyledMobileTopbarBrandLogo
          src={brandLogo}
          onClick={handleBrandLogoClick}
        />
      </StyledMobileTopbarBrandLogoContainer>
      {isFullscreenMenuOpen ? (
        <IconButton size="small" onClick={handleCloseButtonClick}>
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
