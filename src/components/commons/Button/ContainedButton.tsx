import React from "react"
import { StyledContainedButton } from "./ContainedButton.styled"
import { ButtonProps } from "@mui/material/Button"

const ContainedButton = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledContainedButton variant="contained" {...props}>
      {children}
    </StyledContainedButton>
  )
}

export default ContainedButton
