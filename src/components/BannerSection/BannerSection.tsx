import React from "react"
import { ContainedButton } from "../commons/Button"
import {
  StyledBannerSection,
  StyledBannerSectionButtonContainer,
  StyledBannerSectionContent,
  StyledBannerSectionHeader,
  StyledBannerSectionImage,
  StyledBannerSectionPrimaryHeader,
  StyledBannerSectionSubHeader,
} from "./BannerSection.styled"
import bannerImage from "@/assets/images/landing-banner.png"
import { navigate } from "gatsby"
import routes from "@/constants/routes"

const BannerSection = () => {
  const handleNavigateToSignup = () => {
    navigate(routes.signup)
  }

  return (
    <StyledBannerSection>
      <StyledBannerSectionContent>
        <StyledBannerSectionPrimaryHeader>
          No refreshing. Auto accepting. Instant notifications.
        </StyledBannerSectionPrimaryHeader>
        <StyledBannerSectionHeader>
          The freedom and flexibility to earn maximum amount, according to your
          schedule.
        </StyledBannerSectionHeader>
        <StyledBannerSectionSubHeader>
          Arrium allows you to set your preferences for the blocks that you want
          to work, and then it accepts the blocks as soon as they appear.
        </StyledBannerSectionSubHeader>
        <StyledBannerSectionButtonContainer>
          <ContainedButton onClick={handleNavigateToSignup}>
            Start Free Trial
          </ContainedButton>
        </StyledBannerSectionButtonContainer>
        <StyledBannerSectionImage src={bannerImage} />
      </StyledBannerSectionContent>
    </StyledBannerSection>
  )
}

export default BannerSection
