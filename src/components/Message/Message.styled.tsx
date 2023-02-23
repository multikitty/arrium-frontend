import { SnackbarContent } from "notistack"
import styled, { css } from "styled-components"
import { PALETTE } from "@/constants/colors"

const variantColorMap = {
  success: "#2DB560",
  warning: "#FAB11E",
  error: "#FA6464",
}

export const StyledMessage = styled(SnackbarContent)<{
  hidden?: boolean
  variant: "success" | "warning" | "error"
}>`
  padding: 12px 10px;
  display: flex;
  align-items: center;
  border: 1px solid ${p => variantColorMap[p.variant]};
  border-radius: 8px;
  background-color: ${PALETTE.common.white};
  ${p =>
    p.hidden &&
    css`
      display: hidden;
      opacity: 0;
      pointer-events: none;
    `};
`

export const StyledMessageIconContainer = styled.div`
  margin-right: 12px;
  display: flex;
`

export const StyledMessageTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;

  color: ${p => p.theme.palette.blackText};
`

export const StyledMessageText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: ${p => p.theme.palette.grey7};

  & a,
  & .link {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
  }
`
