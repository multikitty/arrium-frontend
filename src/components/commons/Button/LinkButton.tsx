import React from "react"
import { StyledLinkButton } from "./LinkButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface IButtonProps extends ButtonProps {}

const LinkButton = ({ children, ...props }: IButtonProps) => {
  return <StyledLinkButton {...props}>{children}</StyledLinkButton>
}

export default LinkButton
