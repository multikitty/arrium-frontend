import { rem } from "polished"
import { ZIndices, devices } from "@/constants/device"
import {
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
  StyledFooterSectionInfoLink,
  StyledFooterSectionInfoLinksContainer,
} from "@/components/FooterSection/FooterSection.styled"
import { PALETTE } from "@/constants/colors"
import styled, { css } from "styled-components"

export const StyledLandingNavbar = styled.div<{ $hasBackground?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${ZIndices.navbar};
  display: flex;
  align-items: center;
  padding: ${rem("28px")} ${rem("80px")};

  ${p =>
    p.$hasBackground &&
    css`
      background-color: ${PALETTE.common.white};
      box-shadow: 0px 2px 4px rgba(5, 23, 51, 0.05);
    `}

  @media ${devices.desktop.down} {
    padding: ${rem("20px")} ${rem("16px")};
  }
`

export const StyledLandingNavbarBrandLogoContainer = styled(
  StyledFooterSectionBrandLogoContainer
)`
  margin-right: ${rem("80px")};

  @media ${devices.web.down} {
    margin-right: 0;
    margin-bottom: 0;
  }
`

export const StyledLandingNavbarBrandLogo = styled(
  StyledFooterSectionBrandLogo
)`
  @media ${devices.desktop.down} {
    width: 38px;
    height: 41px;
    cursor: pointer;
  }
`

export const StyledLandingNavbarInfoLinksContainer = styled(
  StyledFooterSectionInfoLinksContainer
)`
  flex-direction: row;
  margin-right: 0;
`

export const StyledLandingNavbarInfoLink = styled(StyledFooterSectionInfoLink)`
  margin-right: ${rem("40px")};
  margin-bottom: 0;
`

export const StyledLandingNavbarRightContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const StyledLandingNavbarRightContainerLoginButton = styled.button<{
  $mobileTopbar?: boolean
}>`
  all: unset;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  margin-right: ${p => (p.$mobileTopbar ? "20px" : "40px")};
  transition: all 150ms ease-out;

  color: ${PALETTE.blackText};

  &:hover {
    color: ${PALETTE.main};
  }
`
