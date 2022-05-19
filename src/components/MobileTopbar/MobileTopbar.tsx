import React from "react"
import {
  StyledMobileTopbar,
  StyledMobileTopbarBrandLogo,
  StyledMobileTopbarBrandLogoContainer,
} from "./MobileTopbar.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { Badge, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { navigate } from "gatsby"
import { defaultRoutes, UserRoles } from "@/constants/common"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"

export interface IProps {
  isFullscreenMenuOpen: boolean
  handleFullscreenMenuOpen: () => void
  handleFullscreenMenuClose: () => void
}

const MobileTopbar: React.FC<IProps> = ({
  handleFullscreenMenuClose,
  handleFullscreenMenuOpen,
  isFullscreenMenuOpen,
}) => {
  const { userStore } = useStore()

  const handleMenuButtonClick = () => {
    handleFullscreenMenuOpen()
  }

  const handleCloseButtonClick = () => {
    handleFullscreenMenuClose()
  }

  const handleBrandLogoClick = () => {
    navigate(
      `/${
        defaultRoutes[
          (userStore.currentUser?.role || UserRoles.driver) as UserRolesType
        ]
      }`
    )
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
