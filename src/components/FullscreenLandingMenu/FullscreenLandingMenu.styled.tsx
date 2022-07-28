import styled, { css } from "styled-components"
import { rem } from "polished"
import {
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
  StyledFooterSectionInfoLink,
  StyledFooterSectionInfoLinksContainer,
} from "../FooterSection/FooterSection.styled"

export const StyledFullscreenLandingMenu = styled.div<{ visible?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.palette.common.white};
  z-index: ${p => p.theme.zIndices.fullscreenLandingMenu};
  transition: opacity 150ms ease-out;
  width: 30%;
  min-width: 260px;

  ${p =>
    p.visible
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`

export const StyledFullscreenLandingMenuTopSection = styled.div`
  display: flex;
  align-items: center;
  padding: ${rem("16px")} ${rem("18px")};
`

export const StyledFullscreenLandingMenuBrandLogoContainer = styled(
  StyledFooterSectionBrandLogoContainer
)`
  margin-bottom: 0;
  align-items: center;
`

export const StyledFullscreenLandingMenuBrandLogo = styled(
  StyledFooterSectionBrandLogo
)``

export const StyledFullscreenLandingMenuInfoLinksContainer = styled(
  StyledFooterSectionInfoLinksContainer
)`
  padding: ${rem("40px")} ${rem("60px")};
`

export const StyledFullscreenLandingMenuInfoLink = styled(
  StyledFooterSectionInfoLink
)`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("20px")};
  line-height: 100%;
`

export const StyledFullscreenLandingMenuBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: ${rem("40px")};
`

export const StyledFullscreenLandingMenuBottomSectionButtonContainer = styled.div`
  width: 100%;
  margin-bottom: ${rem("16px")};
`
