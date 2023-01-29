import React from "react"
import { StyledHelperText } from "./HelperText.styled"
import type { Property } from "csstype"
import { PALETTE } from "@/constants/colors"

export type HelperTextType = "small" | "large"

const largeProps = {
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
} as const

const smallProps = {
  fontWeight: "normal",
  fontSize: "10px",
  lineHeight: "16px",
} as const

const typeMap = {
  small: smallProps,
  large: largeProps,
} as const

interface HelperTextProps {
  isCentered?: boolean
  maxWidth?: Property.MaxWidth
  minWidth?: Property.MinWidth
  mt?: Property.MarginTop
  mb?: Property.MarginBottom
  ml?: Property.MarginLeft
  mr?: Property.MarginRight
  color?: Property.Color
  type?: HelperTextType
}

const HelperText: React.FC<HelperTextProps> = ({
  children,
  isCentered = false,
  ml = "0",
  color = PALETTE.errorText,
  type = "small",
  ...props
}) => {
  return (
    <StyledHelperText
      isCentered={isCentered}
      ml={ml}
      color={color}
      {...typeMap[type]}
      {...props}
    >
      <React.Fragment>{children}</React.Fragment>
    </StyledHelperText>
  )
}

export default HelperText
