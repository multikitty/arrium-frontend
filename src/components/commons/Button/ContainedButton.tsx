import React from "react"
import { StyledContainedButton } from "./ContainedButton.styled"
import { ButtonProps } from "@mui/material/Button"

interface IProps extends ButtonProps {
  iconButton?: boolean
  error?: boolean
  fontSize?: number
}

const ContainedButton = ({ children, ...props }: IProps) => {
  return (
    <StyledContainedButton
      variant="contained"
      iconButton={props.iconButton}
      error={props.error}
      fontSize={props.fontSize}
      {...props}
    >
      {children}
    </StyledContainedButton>
  )
}

export default ContainedButton
