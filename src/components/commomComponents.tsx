import { Box, Button, TextField } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"

export const StyledInputField = styled(TextField)`
  &&& {
    background-color: #ffffff;
    min-width: ${rem("335px")};
    max-width: ${rem("378px")};
    height: ${rem("48px")};
    border-radius: ${rem("10px")};
    margin-bottom: ${rem("16px")};

    & > .MuiOutlinedInput-root {
      min-width: ${rem("335px")};
      max-width: ${rem("378px")};
      height: ${rem("48px")};
      border-radius: ${rem("10px")};
    }
  }
`

export const StyledTitle = styled.h2`
  font-weight: 700;
  size: ${rem("34px")};
  color: #2453b2;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  margin-top: ${rem("80px")};
  margin-bottom: ${rem("118px")};
  text-transform: uppercase;
`

export const StyledLoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${rem("20px")};
  background-color: #f2f3f7;
  padding: ${rem("40px")};
  width: ${rem("458px")};
`

export const StyledLoginText = styled.h4`
  font-size: ${rem("28px")};
  font-weight: 400;
  color: #0a0a0a;
  padding: 0 ${rem("40px")} ${rem("40px")} ${rem("40px")};
  line-height: ${rem("32px")};
`
export const StyledRemeberMeText = styled.label`
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  color: #888a95;
`

export const StyledCheckBox = styled.input`
  margin-right: ${rem("8px")};
  width: ${rem("16px")};
  height: ${rem("16px")};
`

export const StyledForgotPassword = styled(Box)`
  cursor: pointer;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  & > a {
    color: #888a95;
    text-decoration: none;
  }
`

export const StyledButton = styled(Button)<{ marginBotton?: string }>`
  &&& {
    color: white;
    border-radius: 10px;
    padding: ${rem("14px")} ${rem("28px")};
    margin-top: ${p => p.marginBotton};
    & > a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`

export const StyledButtonText = styled.h5`
  font-size: ${rem("16px")};
  font-weight: 600;
  line-height: ${rem("20px")};
  width: 100%;
`

export const StyledSignUpText = styled.h5`
  margin-top: ${rem("16px")};
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("20px")};
  color: #888a95;
`

export const StyledSignUpButton = styled.span`
  font-size: ${rem("16px")};
  font-weight: 600;
  color: #0a0a0a;
  line-height: ${rem("20px")};
  & > a {
    color: #0a0a0a;
    text-decoration: none;
  }
`
export const StyledInstructionsText = styled.p`
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("24px")};
  margin-bottom: ${rem("16px")};
  text-align: center;
`
