import React from "react"
import { StyledInputField } from "./InputField.styled"
import { TextFieldProps } from "@mui/material"
import { Property } from "csstype"

type InputFieldProps = {
  mb?: Property.MarginBottom
  isCentered?: boolean
  maxWidth?: string
  minWidth?: string
  centerInput?: boolean
} & TextFieldProps

const InputField: React.FC<InputFieldProps> = React.forwardRef(
  ({ children, mb = "16px", isCentered = false, ...props }, ref) => {
    return (
      <StyledInputField mb={mb} isCentered={isCentered} ref={ref} {...props}>
        <React.Fragment>{children}</React.Fragment>
      </StyledInputField>
    )
  }
)

export default InputField
