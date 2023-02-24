import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { TextField } from "@mui/material"
import theme from "@/theme"
import { Property } from "csstype"

interface StyledInputFieldProps {
  $mb: Property.MarginBottom
  $isCentered: boolean
  $maxWidth?: string
  $minWidth?: string
  $centerInput?: boolean
}

export const StyledInputField = styled(TextField)<StyledInputFieldProps>`
  &&& {
    background-color: #ffffff;
    width: 100%;
    height: ${"52px"};
    border: none;
    outline: none;
    ${p =>
      p.$isCentered &&
      css`
        margin: 0 auto;
      `}
    margin-bottom: ${p => p.$mb};
    border-radius: ${"10px"};

    & > .MuiOutlinedInput-root {
      max-width: ${p => p.$maxWidth || "378px"};
      height: ${"52px"};
      min-width: ${p => p.$minWidth || "250px"};
      border-color: ${theme.palette.errorText};
      border-radius: ${"10px"};
      ${p =>
        p.$centerInput &&
        css`
          margin: 0 auto;
        `}
    }
  }
`
