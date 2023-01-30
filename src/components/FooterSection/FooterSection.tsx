import React from "react"
import {
  StyledFlexGrow,
  StyledFooterSection,
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
  StyledFooterSectionInfoLink,
  StyledFooterSectionInfoLinksContainer,
  StyledFooterSectionRightContainer,
  StyledFooterSectionRightContainerButtonContainer,
  StyledFooterSectionSocialIcon,
  StyledFooterSectionSocialIconsContainer,
  StyledFooterSectionSocialLinkMail,
  StyledFooterSectionSocialLinksContainer,
} from "./FooterSection.styled"
import brandLogo from "@/assets/icons/arrium_logo.svg"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import InstagramIcon from "@/assets/icons/footer-instagram_logo.inline.svg"
import FacebookIcon from "@/assets/icons/footer-facebook_logo.inline.svg"
import { Link } from "react-scroll"
import { IconButton } from "@mui/material"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IFooterSectionProps extends IPageProps {}

const FooterSection: React.FC<IFooterSectionProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })

  const handleRedirectToInstagram = () =>
    window.open("https://www.instagram.com/", "_blank")
  const handleRedirectToFacebook = () =>
    window.open("https://www.facebook.com/", "_blank")
  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  return (
    <StyledFooterSection>
      <StyledFooterSectionBrandLogoContainer>
        <StyledFooterSectionBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHome}
        />
      </StyledFooterSectionBrandLogoContainer>
      <StyledFooterSectionInfoLinksContainer>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="benefits-section"
            spy={true}
            smooth={true}
          >
            Benefits
          </Link>
        </StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="how-it-works-section"
            spy={true}
            smooth={true}
          >
            How it Works
          </Link>
        </StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>
          <Link
            delay={300}
            offset={-50}
            to="contact-us-section"
            spy={true}
            smooth={true}
          >
            Contact Us
          </Link>
        </StyledFooterSectionInfoLink>
      </StyledFooterSectionInfoLinksContainer>
      <StyledFooterSectionSocialLinksContainer>
        <StyledFooterSectionSocialLinkMail href="mailto:info@arrium.com">
          info@arrium.com
        </StyledFooterSectionSocialLinkMail>
        <StyledFooterSectionSocialIconsContainer>
          <StyledFooterSectionSocialIcon mr onClick={handleRedirectToInstagram}>
            <IconButton size="small">
              <InstagramIcon />
            </IconButton>
          </StyledFooterSectionSocialIcon>
          <StyledFooterSectionSocialIcon onClick={handleRedirectToFacebook}>
            <IconButton size="small">
              <FacebookIcon />
            </IconButton>
          </StyledFooterSectionSocialIcon>
        </StyledFooterSectionSocialIconsContainer>
      </StyledFooterSectionSocialLinksContainer>
      <StyledFlexGrow />
      <StyledFooterSectionRightContainer>
        <StyledFooterSectionRightContainerButtonContainer login>
          <OutlinedButton
            onClick={() => navigate(routes.signin)}
            sx={{ width: "100%", height: "100%" }}
          >
            Login
          </OutlinedButton>
        </StyledFooterSectionRightContainerButtonContainer>
        <StyledFooterSectionRightContainerButtonContainer>
          <ContainedButton
            onClick={() => navigate(routes.signup)}
            sx={{ width: "100%", whiteSpace: "nowrap" }}
          >
            Start Free Trial
          </ContainedButton>
        </StyledFooterSectionRightContainerButtonContainer>
      </StyledFooterSectionRightContainer>
    </StyledFooterSection>
  )
}

export default FooterSection
