import styled from "styled-components"
import { rem } from "polished"
import { devices } from "@/constants/device"

export const StyledFooterSection = styled.div`
  display: flex;
  padding: ${rem("48px")} ${rem("80px")} ${rem("56px")};
  width: 100%;
  margin: 0 auto;
  justify-content: center;

  @media ${devices.desktop.down} {
    padding: ${rem("40px")} ${rem("32px")} ${rem("68px")};
  }

  @media ${devices.web.down} {
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

  @media ${devices.desktop.down} {
    margin-right: ${rem("67px")};
  }

  @media ${devices.web.down} {
    margin-right: 0;
    margin-bottom: ${rem("40px")};
  }
`

export const StyledFooterSectionBrandLogo = styled.img`
  height: ${rem("20px")};
  width: ${rem("125px")};
  cursor: pointer;
`

export const StyledFooterSectionInfoLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${rem("96px")};

  @media ${devices.desktop.down} {
    margin-right: ${rem("67px")};
  }

  @media ${devices.web.down} {
    margin-right: 0;
    margin-bottom: ${rem("20px")};
  }
`

export const StyledFooterSectionInfoLink = styled.div`
  text-decoration: none;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: 100%;
  margin-bottom: ${rem("20px")};
  transition: all 150ms ease-out;

  color: ${p => p.theme.palette.blackText};

  &:hover {
    font-weight: 600;
    color: ${p => p.theme.palette.main};
  }
`

export const StyledFooterSectionSocialLinksContainer = styled(
  StyledFooterSectionInfoLinksContainer
)`
  margin-right: ${rem("78px")};

  @media ${devices.desktop.down} {
    margin-right: 0;
    margin-bottom: ${rem("12px")};
    margin-top: -${rem("12px")};
  }
`

export const StyledFooterSectionCountryDropdownContainer = styled(
  StyledFooterSectionInfoLinksContainer
)`
  @media ${devices.desktop.up} {
    margin-right: ${rem("96px")};
  }

  @media ${devices.web.up} {
    margin-right: ${rem("67px")};
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

  @media ${devices.web.down} {
    margin-bottom: 0;
  }
`

export const StyledFooterSectionSocialIconsContainer = styled.div`
  display: flex;
`

export const StyledFooterSectionSocialIcon = styled.div<{ mr?: boolean }>`
  margin-right: ${p => (p.mr ? rem("12px") : 0)};
  cursor: pointer;

  svg {
    --svg-size: 32px;
    height: var(--svg-size);
    width: var(--svg-size);

    @media ${devices.web.down} {
      --svg-size: 44px;
    }
  }

  ellipse,
  circle {
    transition: all 150ms ease-out;
  }

  &:hover ellipse,
  &:hover circle {
    fill: ${p => p.theme.palette.main};
  }
`

export const StyledFlexGrow = styled.div`
  flex-grow: 1;
`

export const StyledFooterSectionRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media ${devices.web.down} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const StyledFooterSectionRightContainerButtonContainer = styled.div<{
  login?: boolean
}>`
  display: flex;
  width: 100%;
  margin-bottom: ${p => p.login && rem("16px")};

  @media ${devices.web.down} {
    margin-bottom: 0;
    margin-right: ${p => p.login && rem("10px")};
  }
`
