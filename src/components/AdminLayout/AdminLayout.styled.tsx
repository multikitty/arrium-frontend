import { rem } from "polished"
import styled from "styled-components"

export const StyledAdminLayout = styled.div`
  display: flex;
  width: 100%;
`

export const StyledAdminLayoutContent = styled.div<{ isWebView?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: ${p => (p.isWebView ? rem("254px") : 0)};
`
