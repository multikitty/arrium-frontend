import React from "react"
import { StyledOutlinedButton } from "./OutlinedButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface OutlinedButtonProps extends ButtonProps {
  grey?: boolean
}

const OutlinedButton = ({ children, grey, ...props }: OutlinedButtonProps) => {
  return (
    <StyledOutlinedButton grey={grey} {...props}>
      {children}
    </StyledOutlinedButton>
  )
}

export default OutlinedButton
