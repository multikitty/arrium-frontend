import styled from "styled-components"
import { rem } from "polished"
import { devices } from "../../constants/device"

export const StyledFooterSection = styled.div`
  display: flex;
  padding: ${rem("48px")} ${rem("80px")} ${rem("56px")};
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${p => p.theme.sizes.container}) {
    padding: ${rem("40px")} ${rem("16px")} ${rem("68px")};
    flex-direction: column;
  }
`

export const StyledFooterSectionBrandLogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: ${rem("96px")};

  @media (max-width: ${p => p.theme.sizes.container}) {
    margin-right: 0;
    margin-bottom: ${rem("40px")};
  }
`

export const StyledFooterSectionBrandLogo = styled.img`
  height: ${rem("20px")};
  width: ${rem("125px")};
`

export const StyledFooterSectionInfoLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${rem("96px")};

  @media (max-width: ${p => p.theme.sizes.container}) {
    margin-right: 0;
    margin-bottom: ${rem("20px")};
  }
`

export const StyledFooterSectionInfoLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: 100%;
  margin-bottom: ${rem("20px")};
  transition: color 150ms ease-out;

  color: ${p => p.theme.palette.blackText};

  &:hover {
    color: ${p => p.theme.palette.main};
  }
`

export const StyledFooterSectionSocialLinksContainer = styled(
  StyledFooterSectionInfoLinksContainer
)`
  @media (max-width: ${p => p.theme.sizes.container}) {
    flex-direction: row;
    justify-content: space-between;
    margin-right: 0;
    margin-bottom: ${rem("40px")};
  }
`

export const StyledFooterSectionSocialLinkMail = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: 100%;
  margin-bottom: ${rem("30px")};
  transition: color 150ms ease-out;

  color: ${p => p.theme.palette.blackText};

  &:hover {
    color: ${p => p.theme.palette.main};
  }
`

export const StyledFooterSectionSocialIconsContainer = styled.div`
  display: flex;
`

export const StyledFooterSectionSocialIcon = styled.div<{ mr?: boolean }>`
  margin-right: ${p => (p.mr ? rem("12px") : 0)};
  cursor: pointer;

  ellipse,
  circle {
    transition: all 150ms ease-out;
  }

  ellipse:hover,
  circle:hover {
    fill: ${p => p.theme.palette.main};
  }
`

export const StyledFlexGrow = styled.div`
  flex-grow: 1;
`

export const StyledFooterSectionRightContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${p => p.theme.sizes.container}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const StyledFooterSectionRightContanerButtonContainer = styled.div<{
  login?: boolean
}>`
  width: 100%;
  margin-bottom: ${p => p.login && rem("16px")};

  @media (max-width: ${p => p.theme.sizes.container}) {
    margin-right: ${p => p.login && rem("10px")};
  }
`
