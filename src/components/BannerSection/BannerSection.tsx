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
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { LANDING_PAGE_IDS } from "@/constants/ids"

interface BannerSectionProps extends PageProps {}

const BannerSection: React.FC<BannerSectionProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })

  const handleNavigateToSignup = () => {
    navigate(routes.signup)
  }

  return (
    <StyledBannerSection id={LANDING_PAGE_IDS["banner-section"]}>
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
