import React from "react"
import {
  StyledMobileTopbar,
  StyledMobileTopbarBrandLogo,
  StyledMobileTopbarBrandLogoContainer,
} from "./MobileTopbar.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { Badge, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { MobileTopbarProps } from "./MobileTopbar.types"

const MobileTopbar: React.FC<MobileTopbarProps> = ({
  handleFullscreenMenuClose,
  handleFullscreenMenuOpen,
  isFullscreenMenuOpen,
}) => {
  const handleMenuButtonClick = () => {
    handleFullscreenMenuOpen()
  }

  const handleCloseButtonClick = () => {
    handleFullscreenMenuClose()
  }

  return (
    <StyledMobileTopbar>
      <StyledMobileTopbarBrandLogoContainer>
        <StyledMobileTopbarBrandLogo src={brandLogo} />
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
