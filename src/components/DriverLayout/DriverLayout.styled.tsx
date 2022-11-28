import { rem } from "polished"
import styled from "styled-components"

export const StyledDriverLayout = styled.div`
  display: flex;
  width: 100%;
`

export const StyledDriverLayoutContent = styled.div<{
  isDesktopView?: boolean
  isCollapsed?: boolean
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: ${p => !p.isDesktopView && rem("64px")};
  padding-left: ${p =>
    p.isDesktopView ? (p.isCollapsed ? rem("92px") : rem("254px")) : 0};
`
