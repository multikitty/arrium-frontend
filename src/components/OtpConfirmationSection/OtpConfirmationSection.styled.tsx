import { rem } from "polished"
import OtpInput from "react-otp-input"
import styled from "styled-components"
import theme from "@/theme"

export const StyledOtpInput = styled(OtpInput)`
  &&& {
    & > input {
      margin-right: ${rem("8px")};
      width: ${rem("40px")} !important;
      height: ${rem("48px")};
      border-radius: ${rem("10px")};
      border: 1px solid ${theme.palette.grey4};
    }
  }
`
