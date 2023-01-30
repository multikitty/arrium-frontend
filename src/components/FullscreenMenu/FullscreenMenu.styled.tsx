import styled, { css } from "styled-components"
import { rem } from "polished"
import {
  StyledSidePanelItem,
  StyledSidePanelItemIcon,
  StyledSidePanelItemText,
} from "../SidePanel/SidePanel.styled"
import { StyledNotificationsDropdownUpperSectionDismissButton } from "../NotificationsDropdown/NotificationsDropdown.styled"

export const StyledFullscreenMenu = styled.div<{
  visible?: boolean
}>`
  background-color: ${p => p.theme.palette.common.white};
  height: calc(100vh - ${p => rem(p.theme.sizes.topbarHeight)});
  z-index: ${p => p.theme.zIndices.fullscreenLandingMenu};
  transition: opacity 150ms ease-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${p => rem(p.theme.sizes.topbarHeight)};
  left: 0;
  width: 100%;

  ${p =>
    p.visible
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          height: 0;
          opacity: 0;
          pointer-events: none;
        `}
`

export const StyledFullscreenMenuUpperContainer = styled.div`
  background-color: ${p => p.theme.palette.background};
  margin-bottom: ${rem("1px")};
  padding-top: ${rem("14px")};
`

export const StyledFullscreenMenuUpperContainerItem = styled.div<{
  active?: boolean
  last?: boolean
}>`
  display: flex;
  align-items: center;
  margin-top: ${rem("7px")};
  margin-bottom: ${p => (p.last ? rem("14px") : 0)};
  padding: ${rem("12px")} ${rem("24px")};
  border-left: 4px solid transparent;
  background-color: ${p =>
    p.active ? p.theme.palette.common.white : "transparent"};
  border-left-color: ${p => (p.active ? p.theme.palette.main : "transparent")};
`

export const StyledFullscreenMenuUpperContainerItemText = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledFullscreenMenuUpperContainerNotificationIcon = styled.div`
  width: ${rem("40px")};
  height: ${rem("40px")};
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledFullscreenMenuBottomContainer = styled.div`
  flex-grow: 1;
  background-color: ${p => p.theme.palette.background};
  display: flex;
  flex-direction: column;
`

export const StyledFullscreenMenuBottomContainerItem = styled(
  StyledSidePanelItem
)``

export const StyledFullscreenMenuBottomContainerItemIcon = styled(
  StyledSidePanelItemIcon
)``

export const StyledFullscreenMenuBottomContainerItemText = styled(
  StyledSidePanelItemText
)``

export const StyledFullscreenMenuNotifications = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("20px")};
  padding-top: 0;
`

export const StyledFullscreenMenuNotificationsUpperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const StyledFullscreenMenuNotificationsUpperContainerTitle = styled.h3`
  flex-grow: 1;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("20px")};
  line-height: ${rem("24px")};
  margin-right: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledFullscreenMenuNotificationsUpperContainerDismissButton = styled(
  StyledNotificationsDropdownUpperSectionDismissButton
)``

export const StyledFullscreenMenuNotificationsList = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledFullscreenMenuNotificationsListItem = styled.div`
  padding: ${rem("16px")} 0;
`
