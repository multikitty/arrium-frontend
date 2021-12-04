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
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { Link } from "react-scroll"
import { ContainedButton } from "../commons/Button"
import { navigate } from "gatsby-link"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"

const LandingNavbar = () => {
  const handleNavigateToHome = () => navigate("/")
  const [hasBackground, setHasBackground] = useState<boolean>(false)

  const windowScrollEventHandler = () => {
    const position = window.pageYOffset
    if (position > 60) setHasBackground(true)
    else setHasBackground(false)
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", windowScrollEventHandler)
    return () => window.removeEventListener("scroll", windowScrollEventHandler)
  }, [])

  return (
    <StyledLandingNavbar $hasBackground={hasBackground}>
      <StyledLandingNavbarBrandLogoContainer>
        <StyledLandingNavbarBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHome}
        />
      </StyledLandingNavbarBrandLogoContainer>
      <StyledLandingNavbarInfoLinksContainer>
        <StyledLandingNavbarInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="benefits-section"
            spy={true}
            smooth={true}
          >
            Benefits
          </Link>
        </StyledLandingNavbarInfoLink>
        <StyledLandingNavbarInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="how-it-works-section"
            spy={true}
            smooth={true}
          >
            How it Works
          </Link>
        </StyledLandingNavbarInfoLink>
        <StyledLandingNavbarInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="contact-us-section"
            spy={true}
            smooth={true}
          >
            Contact Us
          </Link>
        </StyledLandingNavbarInfoLink>
      </StyledLandingNavbarInfoLinksContainer>
      <StyledFlexGrow />
      <StyledLandingNavbarRightContainer>
        <StyledLandingNavbarRightContainerLoginButton
          onClick={() => navigate("/signin")}
        >
          Login
        </StyledLandingNavbarRightContainerLoginButton>
        <ContainedButton
          onClick={() => navigate("/signup")}
          sx={{ width: "100%", whiteSpace: "nowrap" }}
        >
          Start Free Trial
        </ContainedButton>
      </StyledLandingNavbarRightContainer>
    </StyledLandingNavbar>
  )
}

export default LandingNavbar
