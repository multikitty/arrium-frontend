import React from "react"
import { StyledPaginationButton } from "./PaginationButton.styled"
import { ButtonProps } from "@mui/material/Button"
import { CircularProgress } from "@mui/material"

interface IButtonProps extends ButtonProps {
  grey?: boolean
  isLoading?: boolean
}

const PaginationButton = ({
  children,
  grey = false,
  isLoading = false,
  ...props
}: IButtonProps) => {
  return (
    <StyledPaginationButton
      startIcon={isLoading ? <CircularProgress /> : undefined}
      disabled={isLoading || props.disabled}
      grey={grey}
      {...props}
    >
      {children}
    </StyledPaginationButton>
  )
}

export default PaginationButton
