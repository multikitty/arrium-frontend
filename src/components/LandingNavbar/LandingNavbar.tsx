import React, { useLayoutEffect, useState } from "react"

import {
  StyledLandingNavbar,
  StyledLandingNavbarBrandLogo,
  StyledLandingNavbarBrandLogoContainer,
  StyledLandingNavbarInfoLink,
  StyledLandingNavbarInfoLinksContainer,
  StyledLandingNavbarRightContainer,
  StyledLandingNavbarRightContainerLoginButton,
} from "./LandingNavbar.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { Link } from "react-scroll"
import { ContainedButton } from "../commons/Button"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { rem } from "polished"
import FullscreenLandingMenu from "../FullscreenLandingMenu/FullscreenLandingMenu"
import theme from "@/theme"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"
import { LANDING_PAGE_IDS } from "@/constants/ids"

interface ILandingPageProps extends IPageProps {}

const LandingNavbar: React.FC<ILandingPageProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const [hasBackground, setHasBackground] = useState(false)
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState(false)
  const isWebView = useMediaQuery(`(min-width: ${theme.sizes.container})`)

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  const handleFullscreenMenuOpen = () => {
    setFullscreenMenuOpen(true)
  }
  const handleFullscreenMenuClose = () => {
    setFullscreenMenuOpen(false)
  }

  const windowScrollEventHandler = () => {
    handleFullscreenMenuClose()
    const position = window.pageYOffset
    if (position > 60) setHasBackground(true)
    else setHasBackground(false)
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", windowScrollEventHandler)
    return () => window.removeEventListener("scroll", windowScrollEventHandler)
  }, [])

  return (
    <StyledLandingNavbar
      $hasBackground={hasBackground}
      id={LANDING_PAGE_IDS["landing-navbar"]}
    >
      <FullscreenLandingMenu
        open={isFullscreenMenuOpen}
        handleClose={handleFullscreenMenuClose}
        country_code={country_code}
      />
      {isWebView || (
        <IconButton
          sx={{ mr: rem("16px") }}
          size="small"
          onClick={handleFullscreenMenuOpen}
        >
          <MenuIcon sx={{ fontSize: 24 }} />
        </IconButton>
      )}
      <StyledLandingNavbarBrandLogoContainer>
        <StyledLandingNavbarBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHome}
        />
      </StyledLandingNavbarBrandLogoContainer>
      {isWebView && (
        <StyledLandingNavbarInfoLinksContainer>
          <StyledLandingNavbarInfoLink>
            <Link
              delay={300}
              offset={-150}
              to={LANDING_PAGE_IDS["benefits-section"]}
              spy={true}
              smooth={true}
            >
              Benefits
            </Link>
          </StyledLandingNavbarInfoLink>
          <StyledLandingNavbarInfoLink>
            <Link
              delay={300}
              offset={-150}
              to={LANDING_PAGE_IDS["working-section"]}
              spy={true}
              smooth={true}
            >
              How it Works
            </Link>
          </StyledLandingNavbarInfoLink>
          <StyledLandingNavbarInfoLink>
            <Link
              delay={300}
              offset={-150}
              to={LANDING_PAGE_IDS["contact-us-section"]}
              spy={true}
              smooth={true}
            >
              Contact Us
            </Link>
          </StyledLandingNavbarInfoLink>
        </StyledLandingNavbarInfoLinksContainer>
      )}
      <StyledFlexGrow />
      <StyledLandingNavbarRightContainer>
        <StyledLandingNavbarRightContainerLoginButton
          onClick={() => navigate(routes.signin)}
        >
          Login
        </StyledLandingNavbarRightContainerLoginButton>
        {isWebView && (
          <ContainedButton
            onClick={() => navigate(routes.signup)}
            sx={{ width: "100%", whiteSpace: "nowrap" }}
          >
            Start Free Trial
          </ContainedButton>
        )}
      </StyledLandingNavbarRightContainer>
    </StyledLandingNavbar>
  )
}

export default LandingNavbar
