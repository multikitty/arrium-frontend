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
import brandLogo from "@/assets/icons/arrium_logo.png"
import brandSmallLogo from "@/assets/icons/arrium_logo--small.png"
import { Link } from "react-scroll"
import { ContainedButton } from "@/components/commons/Button"
import { StyledFlexGrow } from "@/components/FooterSection/FooterSection.styled"
import { IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import FullscreenLandingMenu from "@/components/FullscreenLandingMenu/FullscreenLandingMenu"
import theme from "@/theme"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { LANDING_PAGE_IDS } from "@/constants/ids"
import { COUNTRY_CODE } from "@/constants/localStorage"
import { localStorageUtils } from "@/utils"

interface LandingPageProps extends PageProps {}

const LandingNavbar: React.FC<LandingPageProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const [hasBackground, setHasBackground] = useState(false)
  const [isFullscreenMenuOpen, setFullscreenMenuOpen] = useState(false)
  const isWebView = useMediaQuery(`(min-width: ${theme.sizes.container})`)
  const codeInStorage = localStorageUtils.get(COUNTRY_CODE)

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

  const handleSigninNavigate = () => {
    if (codeInStorage) {
      navigate(routes.signin)
    }
  }

  const handleSignupNavigate = () => {
    navigate(routes.signup)
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
      {!isWebView && (
        <IconButton size="small" onClick={handleFullscreenMenuOpen}>
          <MenuIcon sx={{ fontSize: 24, mr: "8px" }} />
        </IconButton>
      )}
      <StyledLandingNavbarBrandLogoContainer>
        <StyledLandingNavbarBrandLogo
          src={isWebView ? brandLogo : brandSmallLogo}
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
          onClick={handleSigninNavigate}
        >
          Login
        </StyledLandingNavbarRightContainerLoginButton>

        {isWebView && (
          <ContainedButton
            onClick={handleSignupNavigate}
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
