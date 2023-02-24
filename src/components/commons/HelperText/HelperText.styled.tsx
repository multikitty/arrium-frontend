import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type { Property } from "csstype"

interface StyledHelperTextProps {
  $isCentered: boolean
  $ml: Property.MarginLeft
  $color: Property.Color
  $fontSize: Property.FontSize
  $fontWeight: Property.FontWeight
  $lineHeight: Property.LineHeight
  $maxWidth?: Property.MaxWidth
  $minWidth?: Property.MinWidth
  $mt?: Property.MarginTop
  $mb?: Property.MarginBottom
  $mr?: Property.MarginRight
}

export const StyledHelperText = styled.p<StyledHelperTextProps>`
  font-family: Inter;
  font-style: normal;
  font-weight: ${p => p.$fontWeight};
  font-size: ${p => p.$fontSize};
  line-height: ${p => p.$lineHeight};
  margin-left: ${p => p.$ml};
  color: ${p => p.$color};
  ${p =>
    p.$isCentered &&
    css`
      margin: 0 auto;
    `}
  ${p =>
    p.$mt &&
    css`
      margin-top: ${p.$mt};
    `}
  ${p =>
    p.$mb &&
    css`
      margin-bottom: ${p.$mb};
    `}
  ${p =>
    p.$mr &&
    css`
      margin-right: ${p.$mr};
    `}
  ${p =>
    p.$maxWidth &&
    css`
      max-width: ${p.$maxWidth};
    `}
  ${p =>
    p.$minWidth &&
    css`
      min-width: ${p.$minWidth};
    `}
`
