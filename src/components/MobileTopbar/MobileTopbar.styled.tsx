import styled from "styled-components"
import { rem } from "polished"
import {
  StyledLandingNavbarBrandLogoContainer,
  StyledLandingNavbarBrandLogo,
} from "../LandingNavbar/LandingNavbar.styled"
import { devices } from "@/constants/device"

export const StyledMobileTopbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${p => rem(p.theme.sizes.topbarHeight)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("16px")} ${rem("20px")};
  background-color: ${p => p.theme.palette.common.white};
  z-index: ${p => p.theme.zIndices.navbar};
`

export const StyledMobileTopbarBrandLogoContainer = styled(
  StyledLandingNavbarBrandLogoContainer
)`
  margin: 0;
  display: flex;
  align-items: center;
`

export const StyledMobileTopbarBrandLogo = styled(
  StyledLandingNavbarBrandLogo
)`
  height: 42px;
  width: 145px;
  cursor: pointer;

  @media ${devices.desktop.down} {
    height: 36px;
    width: 126px;
  }
`
