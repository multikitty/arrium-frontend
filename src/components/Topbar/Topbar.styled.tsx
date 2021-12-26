import { rem } from "polished"
import styled from "styled-components"

export const StyledTopbar = styled.div`
  width: 100%;
  height: ${p => rem(p.theme.sizes.topbarHeight)};
  display: flex;
  justify-content: flex-end;
  padding: ${rem("16px")} ${rem("56px")};
  z-index: ${p => p.theme.zIndices.navbar};
`

export const StyledTopbarNotificationButton = styled.div<{ active?: boolean }>`
  width: ${rem("40px")};
  height: ${rem("40px")};
  border: 1px solid
    ${p => (p.active ? p.theme.palette.main : p.theme.palette.grey3)};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`
