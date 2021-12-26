import { rem } from "polished"
import styled from "styled-components"
import {
  StyledFooterSectionBrandLogo,
  StyledFooterSectionBrandLogoContainer,
} from "../FooterSection/FooterSection.styled"

export const StyledSidePanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: ${rem("230px")};
  height: 100vh;
  background-color: ${p => p.theme.palette.background};
  /* margin-right: ${rem("24px")}; */
  padding: ${rem("40px")} 0;
  display: flex;
  flex-direction: column;
`

export const StyledSidePanelBrandLogoContainer = styled(
  StyledFooterSectionBrandLogoContainer
)`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-bottom: ${rem("60px")};
`

export const StyledSidePanelBrandLogo = styled(StyledFooterSectionBrandLogo)``

export const StyledSidePanelItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const StyledSidePanelItem = styled.div<{
  active?: boolean
  last?: boolean
}>`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${rem("12px")} ${rem("24px")};
  margin-bottom: ${p => (p.last ? 0 : rem("8px"))};
  border-left: 4px solid transparent;
  background-color: ${p =>
    p.active ? p.theme.palette.common.white : "transparent"};
  border-left-color: ${p => (p.active ? p.theme.palette.main : "transparent")};
  transition: all 150ms ease-out;

  &:hover {
    background-color: ${p => p.theme.palette.common.white};
    border-left-color: ${p => p.theme.palette.main};
  }
`

export const StyledSidePanelItemIcon = styled.div<{ active?: boolean }>`
  margin-right: ${rem("12px")};
  display: flex;
  align-items: center;

  svg {
    height: 24px;
    width: 24px;

    path {
      stroke: ${p => (p.active ? p.theme.palette.main : p.theme.palette.grey6)};
    }
  }
`

export const StyledSidePanelItemText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`
