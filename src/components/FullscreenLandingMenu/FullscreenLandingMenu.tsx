import React from "react"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { rem } from "polished"
import { Link } from "react-scroll"

import {
  StyledFullscreenLandingMenu,
  StyledFullscreenLandingMenuBrandLogo,
  StyledFullscreenLandingMenuBrandLogoContainer,
  StyledFullscreenLandingMenuTopSection,
  StyledFullscreenLandingMenuInfoLinksContainer,
  StyledFullscreenLandingMenuInfoLink,
  StyledFullscreenLandingMenuBottomSectionButtonContainer,
  StyledFullscreenLandingMenuBottomSection,
} from "./FullscreenLandingMenu.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IFullscreenLandingMenuProps extends IPageProps {
  open: boolean
  handleClose: () => void
}

const FullscreenLandingMenu: React.FC<IFullscreenLandingMenuProps> = ({
  handleClose,
  open,
  country_code,
  lang,
}) => {
  const { navigate } = useNavigate({ country_code, lang })

  const handleLoginButtonClick = () => {
    handleClose()
    navigate(routes.signin)
  }

  const handleStartFreeTrialButtonClick = () => {
    handleClose()
    navigate(routes.signup)
  }

  const handleNavigateToHome = () => {
    handleClose()
    navigate(routes.home)
  }

  return (
    <StyledFullscreenLandingMenu visible={open}>
      <StyledFullscreenLandingMenuTopSection>
        <IconButton sx={{ mr: rem("16px") }} size="small" onClick={handleClose}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
        <StyledFullscreenLandingMenuBrandLogoContainer>
          <StyledFullscreenLandingMenuBrandLogo
            src={brandLogo}
            onClick={handleNavigateToHome}
          />
        </StyledFullscreenLandingMenuBrandLogoContainer>
      </StyledFullscreenLandingMenuTopSection>
      <StyledFullscreenLandingMenuInfoLinksContainer>
        <StyledFullscreenLandingMenuInfoLink>
          <Link
            onClick={handleClose}
            delay={300}
            offset={-50}
            to="benefits-section"
            spy={true}
            smooth={true}
          >
            Benefits
          </Link>
        </StyledFullscreenLandingMenuInfoLink>
        <StyledFullscreenLandingMenuInfoLink>
          <Link
            onClick={handleClose}
            delay={300}
            offset={-50}
            to="how-it-works-section"
            spy={true}
            smooth={true}
          >
            How it Works
          </Link>
        </StyledFullscreenLandingMenuInfoLink>
        <StyledFullscreenLandingMenuInfoLink>
          <Link
            onClick={handleClose}
            delay={300}
            offset={-50}
            to="contact-us-section"
            spy={true}
            smooth={true}
          >
            Contact Us
          </Link>
        </StyledFullscreenLandingMenuInfoLink>
      </StyledFullscreenLandingMenuInfoLinksContainer>
      <StyledFlexGrow />
      <StyledFullscreenLandingMenuBottomSection>
        <StyledFullscreenLandingMenuBottomSectionButtonContainer>
          <OutlinedButton
            onClick={handleLoginButtonClick}
            sx={{ width: "100%" }}
          >
            Login
          </OutlinedButton>
        </StyledFullscreenLandingMenuBottomSectionButtonContainer>
        <StyledFullscreenLandingMenuBottomSectionButtonContainer>
          <ContainedButton
            onClick={handleStartFreeTrialButtonClick}
            sx={{ width: "100%", whiteSpace: "nowrap" }}
          >
            Start Free Trial
          </ContainedButton>
        </StyledFullscreenLandingMenuBottomSectionButtonContainer>
      </StyledFullscreenLandingMenuBottomSection>
    </StyledFullscreenLandingMenu>
  )
}

export default FullscreenLandingMenu
