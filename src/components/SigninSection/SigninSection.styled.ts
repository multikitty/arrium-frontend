import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const StyledRemeberMeText = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #888a95;
`

export const StyledCheckBox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`

export const StyledForgotPassword = styled(Box)`
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  & > a {
    color: #888a95;
    text-decoration: none;
  }
`
