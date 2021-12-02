import React from "react"
import { StyledOutlinedButton } from "./OutlinedButton.styled"
import { ButtonProps } from "@mui/material/Button"

const OutlinedButton = ({ children, ...props }: ButtonProps) => {
  return <StyledOutlinedButton {...props}>{children}</StyledOutlinedButton>
}

export default OutlinedButton
