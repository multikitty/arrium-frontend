import React from "react"
import { StyledOutlinedButton } from "./OutlinedButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface IButtonProps extends ButtonProps {
  grey?: boolean
}

const OutlinedButton = ({ children, grey, ...props }: IButtonProps) => {
  return (
    <StyledOutlinedButton grey={grey} {...props}>
      {children}
    </StyledOutlinedButton>
  )
}

export default OutlinedButton
