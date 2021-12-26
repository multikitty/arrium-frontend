import { rem } from "polished"
import styled, { css } from "styled-components"

const variantColorMap = {
  success: "#2DB560",
  warning: "#FAB11E",
  error: "#FA6464",
}

export const StyledMessage = styled.div<{
  hidden?: boolean
  variant: "success" | "warning" | "error"
}>`
  padding: ${rem("4px")} ${rem("8px")};
  display: flex;
  align-items: center;
  border: 1px solid ${p => variantColorMap[p.variant]};
  border-radius: ${rem("8px")};
  ${p =>
    p.hidden &&
    css`
      display: hidden;
      opacity: 0;
      pointer-events: none;
    `}
`

export const StyledMessageIconContainer = styled.div`
  margin-right: ${rem("12px")};
  display: flex;
`

export const StyledMessageText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};
  margin-right: ${rem("8px")};

  color: ${p => p.theme.palette.blackText};
`
