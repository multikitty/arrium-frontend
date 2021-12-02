import React from "react"
import {
  StyledFlexGrow,
  StyledFooterSection,
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
  StyledFooterSectionInfoLink,
  StyledFooterSectionInfoLinksContainer,
  StyledFooterSectionRightContainer,
  StyledFooterSectionSocialIcon,
  StyledFooterSectionSocialIconsContainer,
  StyledFooterSectionSocialLinkMail,
  StyledFooterSectionSocialLinksContainer,
} from "./FooterSection.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { Box } from "@mui/material"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import InstagramIcon from "../../assets/icons/footer-instagram_logo.inline.svg"
import FacebookIcon from "../../assets/icons/footer-facebook_logo.inline.svg"
import { Link } from "gatsby"
import { rem } from "polished"

const FooterSection = () => {
  return (
    <StyledFooterSection>
      <StyledFooterSectionBrandLogoContainer>
        <StyledFooterSectionBrandLogo src={brandLogo} />
      </StyledFooterSectionBrandLogoContainer>
      <StyledFooterSectionInfoLinksContainer>
        <StyledFooterSectionInfoLink>Benefits</StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>How it Works</StyledFooterSectionInfoLink>
        <StyledFooterSectionInfoLink>Contact Us</StyledFooterSectionInfoLink>
      </StyledFooterSectionInfoLinksContainer>
      <StyledFooterSectionSocialLinksContainer>
        <StyledFooterSectionSocialLinkMail href="mailto:info@arrium.com">
          info@arrium.com
        </StyledFooterSectionSocialLinkMail>
        <StyledFooterSectionSocialIconsContainer>
          <StyledFooterSectionSocialIcon mr>
            <InstagramIcon />
          </StyledFooterSectionSocialIcon>
          <StyledFooterSectionSocialIcon>
            <FacebookIcon />
          </StyledFooterSectionSocialIcon>
        </StyledFooterSectionSocialIconsContainer>
      </StyledFooterSectionSocialLinksContainer>
      <StyledFlexGrow />
      <StyledFooterSectionRightContainer>
        <Box mb={1} width="100%">
          <OutlinedButton
            style={{ width: `${rem("193px")}`, height: `${rem("36px")}` }}
          >
            <Link to="/signin">Login</Link>
          </OutlinedButton>
        </Box>
        <Box>
          <ContainedButton
            style={{ width: `${rem("193px")}`, height: `${rem("36px")}` }}
          >
            <Link to="/signup">Start Free Trial</Link>
          </ContainedButton>
        </Box>
      </StyledFooterSectionRightContainer>
    </StyledFooterSection>
  )
}

export default FooterSection
