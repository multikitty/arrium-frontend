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
  allowNumbers?: boolean
} & TextFieldProps

const InputField: React.FC<InputFieldProps> = React.forwardRef(
  (
    {
      children,
      mb = "16px",
      isCentered = false,
      allowNumbers = true,
      minWidth,
      maxWidth,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const nonDigitRegex = /^\D*$/
      if (!allowNumbers && !e.target.value.match(nonDigitRegex)) return
      onChange?.(e)
    }

    return (
      <StyledInputField
        $mb={mb}
        $isCentered={isCentered}
        ref={ref}
        onChange={handleChange}
        $minWidth={minWidth}
        $maxWidth={maxWidth}
        {...props}
      >
        <React.Fragment>{children}</React.Fragment>
      </StyledInputField>
    )
  }
)

export default InputField
