import { rem } from "polished"
import styled from "styled-components"
import bannerBackground from "@/assets/images/landing-banner_background.png"
import { devices } from "@/constants/device"

export const StyledBannerSection = styled.div`
  background: url(${bannerBackground}) no-repeat;
  background-size: cover;
  overflow: hidden;
`

export const StyledBannerSectionContent = styled.div`
  max-width: ${p => p.theme.sizes.container};
  width: 100%;
  margin: 0 auto;
`

export const StyledBannerSectionPrimaryHeader = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("18px")};
  line-height: 100%;
  width: 96%;
  max-width: ${rem("464px")};
  margin: 0 auto;
  text-align: center;
  padding-top: ${rem("125px")};
  margin-bottom: ${rem("24px")};

  @media ${devices.web.down} {
    line-height: ${rem("24px")};
    margin-bottom: ${rem("32px")};
  }
`

export const StyledBannerSectionHeader = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("36px")};
  line-height: ${rem("44px")};
  width: 96%;
  max-width: ${rem("820px")};
  margin: 0 auto;
  text-align: center;

  color: #000000;
  margin-bottom: ${rem("24px")};
`

export const StyledBannerSectionSubHeader = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("18px")};
  line-height: ${rem("24px")};
  width: 96%;
  max-width: ${rem("677px")};
  margin: 0 auto;
  text-align: center;

  color: #585a61;
  margin-bottom: ${rem("32px")};
`

export const StyledBannerSectionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${rem("56px")};

  @media ${devices.web.down} {
    margin-bottom: ${rem("34px")};
  }
`

export const StyledBannerSectionImage = styled.img`
  display: block;
  width: 100%;
  max-width: ${rem("936px")};
  margin: 0 auto;
  padding: 0 ${rem("16px")};
`
