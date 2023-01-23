import React from "react"
import { StyledHelperText } from "./HelperText.styled"
import theme from "@/theme"
import type { Property } from "csstype"

const largeProps = {
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
}

const smallProps = {
  fontWeight: "normal",
  fontSize: "10px",
  lineHeight: "16px",
}

interface HelperTextProps {
  isCentered?: boolean
  maxWidth?: Property.MaxWidth
  minWidth?: Property.MinWidth
  mt?: Property.MarginTop
  mb?: Property.MarginBottom
  ml?: Property.MarginLeft
  mr?: Property.MarginRight
  color?: Property.Color
  type?: "small" | "large"
}

const HelperText: React.FC<HelperTextProps> = ({
  children,
  isCentered = false,
  ml = "16px",
  color = theme.palette.common.darkRed,
  type = "small",
  ...props
}) => {
  return (
    <StyledHelperText
      isCentered={isCentered}
      ml={ml}
      color={color}
      {...(type === "small" ? smallProps : largeProps)}
      {...props}
    >
      <React.Fragment>{children}</React.Fragment>
    </StyledHelperText>
  )
}

export default HelperText
