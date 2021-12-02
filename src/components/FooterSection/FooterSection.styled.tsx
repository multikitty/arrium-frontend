import styled from "styled-components"
import { rem } from "polished"

export const StyledFooterSection = styled.div`
  display: flex;
  padding: ${rem("80px")} ${rem("80px")} ${rem("56px")};
  /* max-width: ${p => p.theme.sizes.container}; */
  width: 100%;
  margin: 0 auto;
`

export const StyledFooterSectionBrandLogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: ${rem("96px")};
`

export const StyledFooterSectionBrandLogo = styled.img`
  height: ${rem("20px")};
  width: ${rem("125px")};
`

export const StyledFooterSectionInfoLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${rem("96px")};
`

export const StyledFlexGrow = styled.div`
  flex-grow: 1;
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
)``

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

export const StyledFooterSectionRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`
