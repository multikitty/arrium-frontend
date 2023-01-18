import React from "react"
import { StyledLinkButton } from "./LinkButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface LinkButtonProps extends ButtonProps {}

const LinkButton = ({ children, ...props }: LinkButtonProps) => {
  return <StyledLinkButton {...props}>{children}</StyledLinkButton>
}

export default LinkButton
