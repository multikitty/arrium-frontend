import styled from "styled-components"
import { rem } from "polished"

export const StyledFullscreenMenu = styled.div`
  background-color: ${p => p.theme.palette.background};
  height: calc(100vh - ${p => rem(p.theme.sizes.topbarHeight)});
`
