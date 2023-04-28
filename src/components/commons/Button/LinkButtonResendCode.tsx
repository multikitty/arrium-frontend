import React from "react"
import { ButtonProps } from "@mui/material/Button"
import { StyledLinkButtonResendCode } from "./LinkButton.styled"

interface LinkButtonProps extends ButtonProps { }

const LinkButtonResendCode = ({ children, ...props }: LinkButtonProps) => {
  return <StyledLinkButtonResendCode {...props}>{children}</StyledLinkButtonResendCode>
}

export default LinkButtonResendCode
