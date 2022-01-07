import React from "react"
import { StyledContainedButton } from "./ContainedButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface IProps extends ButtonProps {
  iconButton?: boolean
  error?: boolean
}

const ContainedButton = ({ children, ...props }: IProps) => {
  return (
    <StyledContainedButton
      variant="contained"
      iconButton={props.iconButton}
      error={props.error}
      {...props}
    >
      {children}
    </StyledContainedButton>
  )
}

export default ContainedButton
