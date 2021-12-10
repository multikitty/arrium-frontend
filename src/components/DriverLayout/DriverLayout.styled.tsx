import { rem } from "polished"
import styled from "styled-components"

export const StyledDriverLayout = styled.div`
  display: flex;
  width: 100%;
`

export const StyledDriverLayoutContent = styled.div<{ isWebView?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: ${p => !p.isWebView && rem("64px")};
`
