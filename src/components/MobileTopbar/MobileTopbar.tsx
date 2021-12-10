import React from "react"
import {
  StyledMobileTopbar,
  StyledMobileTopbarBrandLogo,
  StyledMobileTopbarBrandLogoContainer,
} from "./MobileTopbar.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { Badge, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface IProps {
  handleFullscreenMenuOpen: () => void
  handleFullscreenMenuClose: () => void
}

const MobileTopbar = (props: IProps) => {
  const handleMenuButtonClick = () => {
    props.handleFullscreenMenuOpen()
  }

  return (
    <StyledMobileTopbar>
      <StyledMobileTopbarBrandLogoContainer>
        <StyledMobileTopbarBrandLogo src={brandLogo} />
      </StyledMobileTopbarBrandLogoContainer>
      <IconButton size="small" onClick={handleMenuButtonClick}>
        <Badge color="error" overlap="circular" badgeContent=" " variant="dot">
          <MenuIcon sx={{ fontSize: 24 }} />
        </Badge>
      </IconButton>
    </StyledMobileTopbar>
  )
}

export default MobileTopbar
